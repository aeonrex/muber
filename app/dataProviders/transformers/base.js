'use strict';
var version = require('rest-engine').config.get('VERSION');

var link = function (id, resource) {
    return {
        id: id,
        href: '/' + version + '/' + resource + '/' + id
    };
};

module.exports = {

    manyOut: function (results) {
        return {
            count: results.length,
            results: results
        };
    },

    oneOut: function (result, resource) {
        result.self = link(result._id, resource);
        result.id = result._id;
        delete result._id;
        return result;
    },

    link: link
};
