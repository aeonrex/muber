'use strict';

var base = require('./base');

module.exports = {

    manyOut: function (results, query) {
        var out = base.manyOut(results);
        out.location = {
            longitude: query.longitude,
            latitude: query.latitude
        };
        return out;
    }

};
