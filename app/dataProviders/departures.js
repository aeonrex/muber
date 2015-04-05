'use strict';

var log = require('rest-engine').util.log,
    stopModel = require('../models/stops'),
    nextBus = require('./extern/nextBus'),
    transformer = require('./transformers/departures'),
    errors = require(process.cwd() + '/lib/errors');

function DeparturesDataProvider(model) {
    this.model = model;
}

DeparturesDataProvider.prototype.getMany = function (stopId, callback) {
    // the client should send stop mongo id's
    // get the docs get the stuff needed to query nextbus
    stopModel.getOne(stopId, function (err, stop) {
        if (err) {
            log(err);
            return callback(errors('stop', err));
        }

        if (stop.stopId) {
            nextBus.predictions(stop, function (err, xml) {
                if (err) {
                    log(err);
                    return callback('500.0');
                }

                callback(null, transformer.manyOut(xml, stopId));
            });
        } else {
            nextBus.multiplePredictions(stop, function (err, xml) {
                if (err) {
                    return callback(err);
                }
                var transform = transformer.manyOut(xml, stopId);
                if (!transform) {

                }
                callback(null, transform);
            });
        }
    });
};

module.exports = DeparturesDataProvider;
