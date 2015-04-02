'use strict';

var mongoose = require('engine').mongoose,
    dataProvider = require('../dataProviders/stops');

var stopModel = new mongoose.Schema({
    stopId: {
        type: Number
    },

    loc: {
        type: {
            type: String
        },
        coordinates: {
            type: [Number]
        }
    },

    name: {
        type: String
    },

    routes: {
        type: Array
    },

    agency: String
});

stopModel.index({loc: '2dsphere'});

module.exports = new dataProvider(mongoose.model('Stop', stopModel));
