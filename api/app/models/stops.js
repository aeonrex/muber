'use strict';

var mongoose = require('engine').mongoose,
    dataProvider = require('../dataProviders/stops');

var stopModel = new mongoose.Schema({
    nextBusId: {
        type: Number,
        unique: true
    },

    loc: {
        type: {
            type: String
        },
        coordinates: []
    },

    name: {
        type: String
    }
});

module.exports = dataProvider(mongoose.model('Stop', stopModel));
