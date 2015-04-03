'use strict';
var _ = require('../../../../engine/server').util._;

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
    }
};
