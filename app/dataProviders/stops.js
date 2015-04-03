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
                distanceField: "dist.calculated",
                maxDistance: 300,
                minDistance: 0,
                query: {},
                includeLocs: "dist.location",
                num: 100,
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

module.exports = StopsDataProvider;
