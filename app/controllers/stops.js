'use strict';
var engine = require('rest-engine'),
    log = engine.util.log,
    BaseApiController = engine.controllers.base,
    stopsModel = require('../models/stops'),
    StopsApiController = new BaseApiController(stopsModel),
    milesToMeters = require(process.cwd() + '/lib/conversions').milesToMeters,
    errors = require(process.cwd() + '/lib/errors');

StopsApiController.getMany = function (req, res, next) {
    var query = req.query;

    if (!query.longitude || !query.latitude) {
        return next(errors('stop', '400.1'));
    }

    if (isNaN(query.longitude) || isNaN(query.latitude)) {
        return next(errors('stop', '400.2'));
    }
    query.longitude = parseFloat(query.longitude);
    query.latitude = parseFloat(query.latitude);
    query.distance = isNaN(query.distance) ? 300 : milesToMeters(parseFloat(query.distance));

    log('GET /stops');
    log(JSON.stringify(query));
    StopsApiController.model.getMany(query, function (err, stops) {
        if (err) {
            return next(errors('stop', err));
        }
        res.status(200);
        return res.json(stops);
    });

};

StopsApiController.getOne = function (req, res, next) {
    var id = req.params.id;

    if (!id) {
        return next(errors('stop', '400.0'));
    }

    log('GET /stops/' + id);
    StopsApiController.model.getOne(id, function (err, stop) {
        if (err) {
            return next(errors('stop', err));
        }
        res.status(200);
        return res.json(stop);
    });
};

module.exports = StopsApiController;
