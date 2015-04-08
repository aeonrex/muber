var util = require('rest-engine').util,
    base = require('./base'),
    resource = 'departures',
    parseString = require('xml2js').parseString;


function jsonCleanup(json) {
    var results = json.body.predictions.map(function (prediction) {
        return predictionCleanup(prediction);
    });
    var out = base.manyOut(results);
    out.copyright = json.body.$.copyright;
    return out;
}

function predictionCleanup(prediction) {
    var result = prediction.$;

    if (!prediction.direction) {
        if (result.dirTitleBecauseNoPredictions) {
            result.directions = [
                {
                    title: result.dirTitleBecauseNoPredictions
                }
            ];
            delete result.dirTitleBecauseNoPredictions;
        }
        return result;
    }
    result.directions = prediction.direction.map(function (dir) {
        var obj = {};
        obj.title = dir.$.title;
        obj.timeTable = dir.prediction.map(function (p) {
            p = p.$;
            delete p.dirTag;
            delete p.isDeparture;
            delete p.block;
            delete p.tripTag;
            return p;
        });
        return obj;
    });
    return result;
}

var manyOut = function (predictions, stopId) {
    var transform;
    parseString(predictions, function (err, res) {
        if (err) {
            transform = null;
            return;
        }
        transform = jsonCleanup(res);
        transform.stop = base.link(stopId, 'stops');
        transform.self = util.jsonCopy(transform.stop);
        transform.self.href += '/' + resource;
    });
    return transform;
};

module.exports = {
    manyOut: manyOut
};
