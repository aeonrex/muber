'use strict';

var util = require('rest-engine').util,
    base = require('./base'),
    resource = 'stops',
    metersToMiles = require(process.cwd() + '/lib/conversions').metersToMiles;

function coordinateTransform(coord) {
    return {
        longitude: coord[0],
        latitude: coord[1]
    };
}

function distanceTransform(distance) {
    distance.calculated = metersToMiles(distance.calculated);
    return distance;
}

var oneOut = function (result) {
    result.location = result.loc;
    result.location.coordinates = coordinateTransform(result.location.coordinates);

    delete result.loc;
    delete result.location.type;

    result = base.oneOut(result, resource);
    result.departures = util.jsonCopy(result.self);
    result.departures.href += '/departures';
    return result;
};

var manyOut = function (results, query) {
    var out = base.manyOut(results);

    util._.forEach(out.results, function (result) {
        result = oneOut(result, resource);
        result.distance = distanceTransform(result.distance);
    });

    out.location = {
        longitude: query.longitude,
        latitude: query.latitude
    };
    return out;
};

module.exports = {

    oneOut: oneOut,

    manyOut: manyOut

};
