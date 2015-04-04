'use strict';
var engine = require('rest-engine'),
    BaseApiController = engine.controllers.base,
    DeparturesApiController = new BaseApiController(),
    errors = engine.errors;

DeparturesApiController.getForStop = function (req, res, next) {

};

module.exports = DeparturesApiController;
