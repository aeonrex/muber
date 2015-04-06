var engine = require('rest-engine').bootstrap({version:'1.0.0'}),
    request = require('supertest')(engine),
    should = require('should');

describe('Stops tester', function () {

    var uri = '/v1/stops';

    it('GET', function (done) {
        request
            .get(uri)
            .query({
                longitude: -122.41737,
                latitude: 37.8072499
            })
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                should.exist(res.body);
                done();
            });
    });

});
