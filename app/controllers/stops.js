'use strict';
var engine = require('rest-engine'),
    log = engine.util.log,
    BaseApiController = engine.controllers.base,
    stopsModel = require('../models/stops'),
    StopsApiController = new BaseApiController(stopsModel),
    milesToMeters = require('../../lib/conversions').milesToMeters,
    errors = engine.errors;

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
    query.distance = isNaN(query.distance) ? 300 : milesToMeters(parseFloat(query.distance));

    log('GET /stops');
    log(JSON.stringify(query));
    StopsApiController.model.getMany(query, function (err, stops) {
        if (err) {
            log(err);
            return next(new errors.InternalError('GET /stops failed'));
        }
        res.status(200);
        return res.json(stops);
    });

};

StopsApiController.getOne = function (req, res, next) {
    var id = req.params.id;

    if (!id) {
        return next(new errors.BadRequestError('Invalid stop id'));
    }
    log('GET /stops/' + id);
    StopsApiController.model.getOne(id, function (err, stop) {
        if (err) {
            log(err);
            return next(new errors.InternalError('GET /stops/' + id + ' failed.'));
        }
        res.status(200);
        return res.json(stop);
    });
};

module.exports = StopsApiController;
