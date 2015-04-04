'use strict';

var should = require('should');
var nextBus = require('../../app/dataProviders/extern/nextBus');

describe('Next Bus request tester', function () {
//a=sf-muni&stops=N|6997&stops=F|35184

    it('should return predictions for more than one stop', function (done) {
        var requestOptions = {
            agency: 'sf-muni',
            routes: [
                {
                    route: 'F',
                    stop: 35184
                },
                {
                    route: 'N',
                    stop: 6997
                }
            ]
        };

        nextBus.multiplePredictions(requestOptions, function (err, xml, res) {
            if (err) {
                return done(err);
            }
            should.exist(xml);
            console.log(xml);
            console.log(JSON.stringify(res, null, '\t'));
            done();
        });
    });

    it('should return predictions for one stop', function (done) {
        var requestOptions = {
            agency: 'sf-muni',
            stopId: 135184
        };

        nextBus.predictions(requestOptions, function (err, xml) {
            if (err) {
                return done(err);
            }
            should.exist(xml);
            console.log(xml);
            done();
        });
    });

});

