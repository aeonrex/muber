'use strict';
var engine = require('rest-engine'),
    log = engine.util.log,
    BaseApiController = engine.controllers.base,
    departureModel = require('../models/departures'),
    DeparturesApiController = new BaseApiController(departureModel),
    errors = engine.errors;

DeparturesApiController.getForStop = function (req, res, next) {
    var stopId = req.params.id;
    DeparturesApiController.model.getMany(stopId);
    log('GET departures');
    res.status(200);
    res.json({hello: 'world'});
};

module.exports = DeparturesApiController;
