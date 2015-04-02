'use strict';

function StopsDataProvider(model) {
    this.model = model;
}

StopsDataProvider.create = function (nextBusId, name, long, lat, callback) {
    this.model.create({
        nextBustId: nextBusId,
        loc: {
            type: 'Point',
            coordinates: [long, lat]
        },
        name: name
    }, callback);
};

module.exports = StopsDataProvider;
