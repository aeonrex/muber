'use strict';
var log = require('rest-engine').util.log,
    transformer = require('./transformers/stops'),
    mongoose = require('rest-engine').mongoose;

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
    var longitude = data.longitude;
    var latitude = data.latitude;
    var maxDistance = data.distance <= 0 ? 0.01 : data.distance;
    this.model.aggregate([
        {
            $geoNear: {
                near: {type: "Point", coordinates: [longitude, latitude]},
                distanceField: "distance.calculated",
                maxDistance: maxDistance,
                minDistance: 0,
                query: {},
                includeLocs: "distance.location",
                num: 100000,
                spherical: true
            }
        }
    ], function (err, stops) {
        if (err) {
            log(err);
            return callback('500.0');
        }
        callback(null, transformer.manyOut(stops, data));
    });

};

StopsDataProvider.prototype.getOne = function (id, callback) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return callback('400.0');
    }
    this.model.findById(id, function (err, stop) {
        if (err) {
            log(err);
            return callback('500.0');
        }
        if (!stop) {
            return callback('404.0')
        }
        callback(null, transformer.oneOut(stop.toObject()));
    });
};

module.exports = StopsDataProvider;
