'use strict';
var _ = require('rest-engine').util._;

module.exports = {

    manyOut: function (results) {
        _.forEach(results, function (result) {
            result.id = result._id;
            delete result._id;
        });

        return {
            count: results.length,
            results: results
        };
    },

    oneOut: function (result) {
        result.id = result._id;
        delete result._id;
        console.log(result);
        return result;
    }
};
