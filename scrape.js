'use strict';

var async = require('async'),
    engine = require('rest-engine'),
    util = engine.util,
    request = require('request'),
    requestOptions = {
        method: 'GET',
        uri: 'http://webservices.nextbus.com/service/publicXMLFeed',
        qs: {
            command: ''
        }
    },
    parseString = require('xml2js').parseString;

//TODO: possibly break these requests into its own data provider... Even though they may not need to be used.

function getAgencies(callback) {
    var options = engine.util.jsonCopy(requestOptions);
    options.qs.command = 'agencyList';

    request(options, function (err, res, body) {
        if (err) return console.error(err);
        parseString(body, function (err, res) {

            var agencies = res.body.agency.map(function (ag) {
                return ag.$;
            });

            if (typeof callback === 'function') {
                callback(agencies);
            }
        });
    });
}

function getRoutes(agency, callback) {
    var options = engine.util.jsonCopy(requestOptions);
    options.qs.command = 'routeList';
    options.qs.a = agency.tag;

    request(options, function (err, res, body) {
        if (err) return console.error(err);
        parseString(body, function (err, res) {

            var routes = res.body.route.map(function (rt) {
                return rt.$;
            });
            if (typeof callback === 'function') {
                callback(routes);
            }
        });
    });
}

function getStops(agency, route, callback) {
    var options = engine.util.jsonCopy(requestOptions);
    options.qs.command = 'routeConfig';
    options.qs.a = agency.tag;
    options.qs.r = route.tag;

    request(options, function (err, res, body) {
        if (err) return console.error(err);
        parseString(body, function (err, res) {
            if (!res || !res.body || !res.body.route) {
                console.log('Something went wrong' + JSON.stringify(res, null, '\t'));
                return callback([]);
            }

            var stops = res.body.route[0].stop.map(function (st) {
                return st.$;
            });
            if (typeof callback === 'function') {
                callback(stops);
            }
        });
    });
}

function transformStop(data) {
    return {
        stopId: data.stopId,
        name: data.title,
        loc: {
            type: 'Point',
            coordinates: [parseFloat(data.lon), parseFloat(data.lat)]
        },
        agency: data.agency,
        routes: data.routes
    };
}

engine.bootstrap({}, null, function () {
    var stopModel = require('./app/models/stops');
    var agencies = [];
    var stops = {};
    var tryAgain = [];

    async.series([

        function (callback) {
            getAgencies(function (ag) {
                agencies = ag;
                callback();
            });
        },

        function (callback) {
            async.eachSeries(agencies, function (agency, cb) {
                console.log(agency.tag);
                getRoutes(agency, function (rts) {
                    agency.routes = rts;

                    async.eachSeries(agency.routes, function (route, callb) {

                        getStops(agency, route, function (stps) {
                            console.log(route.tag);
                            if (stps.length === 0) {
                                tryAgain.push({
                                    agency: agency,
                                    route: route
                                });
                            }

                            util._.forEach(stps, function (stop) {
                                var id = agency.tag + stop.tag;
                                if (stops[id]) {
                                    stops[id].routes.push({route: route.tag, stop: stop.tag});
                                } else {
                                    stop.agency = agency.tag;
                                    stop.routes = [{route: route.tag, stop: stop.tag}];
                                    stops[id] = transformStop(stop);
                                }
                            });
                            callb();
                        });
                    }, function () {
                        var batch = stops;
                        stops = {};
                        console.log('about to insert');
                        batch = util._.map(batch, function (stop) {
                            return stop;
                        }).filter(function (ele) {
                            return !!ele;
                        });

                        if (batch.length === 0) {
                            return cb();
                            console.log('got nothing');
                        }

                        stopModel.batchInsert(batch, function (doc) {
                            if (doc) console.log(doc);
                            console.log('Insert complete');
                            cb();
                        });
                    });

                });

            }, function (err) {
                callback();
            });
        },

        function (callback) {
            if (tryAgain.length > 0) {
                async.each(tryAgain, function (thing, cb) {
                    var agency = thing.agency;
                    var route = thing.route;

                    getStops(agency, route, function (stps) {

                        if (stps.length === 0) {
                            tryAgain.push({
                                agency: agency,
                                route: route
                            });
                        }

                        console.log(JSON.stringify(stps, null, '\t'));
                        util._.forEach(stps, function (stop) {
                            var id = agency.tag + stop.tag;
                            if (stops[id]) {
                                stops[id].routes.push({route: route.tag, stop: stop.tag});
                            } else {
                                stop.agency = agency.tag;
                                stop.routes = [{route: route.tag, stop: stop.tag}];
                                stops[id] = transformStop(stop);
                            }
                        });
                        cb();
                    });
                }, function () {
                    var batch = stops;
                    stops = [];
                    console.log('about to insert');
                    batch = util._.map(batch, function (stop) {
                        return stop;
                    }).filter(function (ele) {
                        return !!ele;
                    });

                    if (batch.length === 0) {
                        console.log('got nothing');
                        return callback();
                    }
                    stopModel.batchInsert(batch, function (doc) {
                        if (doc) console.log(doc);
                        console.log('Insert complete');
                        callback();
                    });
                });
            } else {
                callback();
            }
        }
    ], function () {
        process.exit();
    });
});
