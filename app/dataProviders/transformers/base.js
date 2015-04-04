'use strict';

module.exports = {

    manyOut: function (results) {
        return {
            count: results.length,
            results: results
        };
    },

    oneOut: function (result) {
        result.id = result._id;
        delete result._id;
        return result;
    }
};
