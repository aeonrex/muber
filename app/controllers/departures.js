'use strict';
var engine = require('rest-engine'),
    log = engine.util.log,
    BaseApiController = engine.controllers.base,
    departureModel = require('../models/departures'),
    DeparturesApiController = new BaseApiController(departureModel),
    errors = engine.errors;

DeparturesApiController.getForStop = function (req, res, next) {
    var stopId = req.params.id;
    log('GET departures');

    DeparturesApiController.model.getMany(stopId, function (err, departures) {
        if (err) {
            return next(new errors.InternalError('Failure when getting departures'));
        }
        res.status(200);
        res.json(departures);
    });
};

module.exports = DeparturesApiController;
