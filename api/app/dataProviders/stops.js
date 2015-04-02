'use strict';

function StopsDataProvider(model) {
    this.model = model;
}

/*StopsDataProvider.prototype.create = function (nextBusId, name, long, lat, callback) {
    this.model.create({
        nextBustId: nextBusId,
        loc: {
            type: 'Point',
            coordinates: [long, lat]
        },
        name: name
    }, callback);
};*/

StopsDataProvider.prototype.batchInsert = function (array, callback) {
    this.model.collection.insert(array, function (err, doc) {
        if (err) throw err;
        callback(doc);
    });
};

module.exports = StopsDataProvider;
