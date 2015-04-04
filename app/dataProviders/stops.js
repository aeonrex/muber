'use strict';
var transformer = require('./transformers/stops');
function StopsDataProvider(model) {
    this.model = model;
}

StopsDataProvider.prototype.batchInsert = function (array, callback) {
    this.model.collection.insert(array, function (err, doc) {
        if (err) throw err;
        callback(doc);
    });
};

StopsDataProvider.prototype.getMany = function (data, callback) {
    this.model.aggregate([
        {
            $geoNear: {
                near: {type: "Point", coordinates: [data.longitude, data.latitude]},
                distanceField: "distance.calculated",
                maxDistance: data.distance,
                minDistance: 0,
                query: {},
                includeLocs: "distance.location",
                num: 100000,
                spherical: true
            }
        }
    ], function (err, stops) {

        if (err) {
            return callback(err);
        }
        callback(null, transformer.manyOut(stops, data));
    });

};

StopsDataProvider.prototype.getOne = function (id, callback) {
    this.model.findById(id, function (err, stop) {
        if (err) {
            return callback(err);
        }
        callback(null, transformer.oneOut(stop.toObject()));
    });
};

module.exports = StopsDataProvider;
