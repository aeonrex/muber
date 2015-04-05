'use strict';

var log = require('rest-engine').util.log,
    stopModel = require('../models/stops'),
    nextBus = require('./extern/nextBus'),
    transformer = require('./transformers/departures');

function DeparturesDataProvider(model) {
    this.model = model;
}

DeparturesDataProvider.prototype.getMany = function (stopId, callback) {
    // the client should send stop mongo id's
    // get the docs get the stuff needed to query nextbus
    stopModel.getOne(stopId, function (err, stop) {
        if (err) {
            log(err);
            return callback(err);
        }

        if (!stop) {
            return callback('500');
        }

        if (stop.stopId) {
            nextBus.predictions(stop, function (err, xml) {
                if (err) {
                    return callback(err);
                }

                callback(null, transformer.manyOut(xml, stopId));
            });
        } else {
            nextBus.multiplePredictions(stop, function (err, xml) {
                if (err) {
                    return callback(err);
                }

                callback(null, transformer.manyOut(xml, stopId));
            });
        }
    });
};

module.exports = DeparturesDataProvider;
