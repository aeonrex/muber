'use strict';

var request = require('request'),
    util = require('rest-engine').util,
    requestOptions = {
        method: 'GET',
        uri: 'http://webservices.nextbus.com/service/publicXMLFeed',
        qs: {
            command: ''
        }
    };

//TODO error handling from returned xml

module.exports = {


    /*
     1) http://webservices.nextbus.com/service/publicXMLFeed?command=predic
     tions&a=<agency_tag>&stopId=<stop id>

     2) http://webservices.nextbus.com/service/publicXMLFeed?command=predic
     tions&a=<agency_tag>&stopId=<stop id>&routeTag=<route tag>
     */

    /**
     *
     * @param {object} options
     * @param {function} callback
     */
    predictions: function (options, callback) {

        var opts = util.jsonCopy(requestOptions);
        opts.qs.command = 'predictions';
        opts.qs.a = options.agency;
        opts.qs.stopId = options.stopId;

        request(opts, function (err, res, xml) {
            if (err) {
                return callback(err);
            }
            callback(null, xml);
        });
    },

    /*

     Each stop is separated by the "|" character and each
     stop is represented by a route and stop identifier, concatenated together. One can also specify
     the useShortTitles=true parameter so that shorter names for the agency, route, direction, and
     stop are returned if shorter names are available. Shorter names can be useful for smaller displays
     such as with wireless devices.
     Currently the predictionsForMultiStops command can only be specified with stop tags. In the
     future we expect to expand the feed so that the command can also be used with stopIds.
     Predictions should only be displayed in minutes, rounding down the number of seconds.
     The format of the command for obtaining predictions for a list of stops is (where a stop specified
     is a route tag and a stop tag separated by the "|" character):

     http://webservices.nextbus.com/service/publicXMLFeed?command=predictionsForMultiStops&a=<agency_tag>&stops=<stop 1>&stops=<stop 2>&stops=<stop3>

     For the example URL:

     http://webservices.nextbus.com/service/publicXMLFeed?command=predictionsForMultiStops&a=sf-muni&stops=N|6997&stops=N|3909

     That stops syntax is horrible
     */

    /**
     *
     * @param {object} options
     * @param {function} callback
     */
    multiplePredictions: function (options, callback) {
        var opts = util.jsonCopy(requestOptions);
        delete opts.qs;

        // have to do this manually, because options.qs won't allow multiple of the same query param, without it being an
        // array, it makes complete sense, but I have to do this hacky solution to work with the next bus API
        var qs = '?command=predictionsForMultiStops&a=' + options.agency;
        util._.forEach(options.routes, function (route) {
            qs += '&stops=' + route.route + '|' + route.stop;

        });
        opts.uri += qs;

        request(opts, function (err, res, xml) {
            if (err) {
                return callback(err);
            }
            callback(null, xml);
        });
    },

    /**
     *
     * @param callback
     */
    agencyList: function (callback) {
        var options = util.jsonCopy(requestOptions);
        options.qs.command = 'agencyList';

        request(options, function (err, res, body) {
            if (err) {
                return callback(err);
            }
            callback(null, xml);
        });
    },

    /**
     *
     * @param agency
     * @param callback
     */
    routeList: function (agency, callback) {
        var options = util.jsonCopy(requestOptions);
        options.qs.command = 'routeList';
        options.qs.a = agency.tag;

        request(options, function (err, res, xml) {
            if (err) {
                return callback(err);
            }
            callback(null, xml);
        });
    },

    /**
     *
     * @param agency
     * @param route
     * @param callback
     */
    routeConfig: function (agency, route, callback) {
        var options = util.jsonCopy(requestOptions);
        options.qs.command = 'routeConfig';
        options.qs.a = agency.tag;
        options.qs.r = route.tag;

        request(options, function (err, res, xml) {
            if (err) {
                return callback(err);
            }
            callback(null, xml);
        });
    }
};
