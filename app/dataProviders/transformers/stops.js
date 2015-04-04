'use strict';

var _ = require('rest-engine').util._,
    base = require('./base'),
    metersToMiles = require('../../../lib/conversions').metersToMiles;

function coordinateTransform(coord) {
    return {
        longitude: coord[0],
        latitude: coord[1]
    };
}

function distanceTransform(distance) {
    distance.calculated = metersToMiles(distance.calculated);
    delete distance.location.type;
    distance.location.coordinates = coordinateTransform(distance.location.coordinates);
    return distance;
}


module.exports = {

    manyOut: function (results, query) {
        var out = base.manyOut(results);

        _.forEach(out.results, function (result) {
            result.location = result.loc;
            result.location.coordinates = coordinateTransform(result.location.coordinates);
            delete result.loc;
            delete result.location.type;
            result.distance = distanceTransform(result.distance);
        });

        out.location = {
            longitude: query.longitude,
            latitude: query.latitude
        };
        return out;
    },

    oneOut: function (result) {
        result.location = result.loc;
        result.location.coordinates = coordinateTransform(result.location.coordinates);
        delete result.loc;
        delete result.location.type;
        return base.oneOut(result);
    }
};
