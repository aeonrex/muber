'use strict';
var BaseApiController = require('engine').controllers.base,
    stopsModel = require('../models/stops'),
    StopsApiController = new BaseApiController(stopsModel),
    errors = require('engine').errors;

StopsApiController.getMany = function (req, res, next) {
    var query = req.query;

    if (!query.longitude || !query.latitude) {
        return next(new errors.BadRequestError('Invalid query params: Expected both longitude and latitude'));
    }

    if (isNaN(query.longitude) || isNaN(query.latitude)) {
        return next(new errors.BadRequestError('Invalid query params: Expected numbers'));
    }

    query.longitude = parseFloat(query.longitude);
    query.latitude = parseFloat(query.latitude);

    console.log('['+ new Date() +'] GET /stops');
    console.log('['+ new Date() + '] ' + JSON.stringify(query));
    StopsApiController.model.getMany(query, function (err, stops) {
        if (err) {
            console.log(err);
            return next(new errors.InternalError('GET /stops failed'));
        }
        res.status(200);
        return res.json(stops);
    });

};


module.exports = StopsApiController;
