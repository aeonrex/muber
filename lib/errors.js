'use strict';

var errors = require('rest-engine').errors;
var util = require('rest-engine').util;
var resources = util.jsonCopy(require('rest-engine').config.get('RESOURCES'));
var errorDictionary = {};

util._.forEach(resources, function (resource, key) {
    errorDictionary[util._.camelCase(key)] = resource.ERRORS;
});

module.exports = function (resource, code) {
    var errMeta = errorDictionary[resource][code],
        error;

    switch (errMeta.http) {
        case 400:
            error = new errors.BadRequestError(errMeta.message);
            break;
        case 404:
            error = new errors.ResourceNotFoundError(errMeta.message);
            break;
        default:
            error = new errors.InternalError('Unknown error occurred');
            break;
    }

    return error;
};
