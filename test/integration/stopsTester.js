'use strict';
var should = require('should'),
    supertest = require('supertest'),
    engine = require('rest-engine').bootstrap();

describe('/v1/stops tester', function () {
    var uri = '/v1/stops';
    var request = supertest(engine);


    describe('GET many cases', function () {
        var response;

        it('Should get a list of bus stops', function (done) {
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
                    response = res.body;
                    done();
                });
        });

        it('Should have a well formatted response', function () {
            should.exist(response.results);
            should.exist(response.count);
            response.results.length.should.equal(response.count);
        });

        it('Should get a single stop', function (done) {
            var stop = response.results[0];

            if (!stop) {
                return done();
            }

            request
                .get(stop.self.href)
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err);
                    should.exist(res);
                    should.exist(res.body);
                    should.exist(res.body.self);
                    res.body.self.href.should.equal(stop.self.href);
                    done();
                });
        });

        it('Should 400 when GET /v1/stops/', function(done) {
            request
                .get('/v1/stops/')
                .expect(400)
                .end(function (err, res) {
                    should.not.exist(err);
                    done();
                });
        });

        it('Should 400 when stop id is malformed', function(done) {
            request
                .get('/v1/stops/asdlkf')
                .expect(400)
                .end(function (err, res) {
                    should.not.exist(err);
                    done();
                });
        });


        it('Should get a single stop\'s departures', function (done) {
            var stop = response.results[0];

            if (!stop) {
                return done();
            }

            request
                .get(stop.departures.href)
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err);
                    should.exist(res);
                    should.exist(res.body);
                    should.exist(res.body.self);
                    res.body.self.href.should.equal(stop.departures.href);
                    done();
                });
        });

        it('Should 400 when GET /v1/stops/', function(done) {
            request
                .get('/v1/stops//departures')
                .expect(400)
                .end(function (err, res) {
                    should.not.exist(err);
                    done();
                });
        });

        it('Should 400 when stop id is malformed', function(done) {
            request
                .get('/v1/stops/asdlkf/departures')
                .expect(400)
                .end(function (err, res) {
                    should.not.exist(err);
                    done();
                });
        });

        it('Should get a list of bus stops - long and lat as strings', function (done) {
            request
                .get(uri)
                .query({
                    longitude: "-122.41737",
                    latitude: "37.8072499"
                })
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err);
                    should.exist(res);
                    should.exist(res.body);
                    done();
                });
        });

        it('Should get a list of bus stops - non-parseable string ', function (done) {
            request
                .get(uri)
                .query({
                    longitude: "hello",
                    latitude: 37.8072499
                })
                .expect(400)
                .end(function (err) {
                    should.not.exist(err);
                    done();
                });
        });

        it('Should get a list of bus stops - no query parameters', function (done) {
            request
                .get(uri)
                .expect(400)
                .end(function (err) {
                    should.not.exist(err);
                    done();
                });
        });

        it('Should get a list of bus stops - random query param', function (done) {
            request
                .get(uri)
                .query({
                    longitude: -122.41737,
                    latitude: 37.8072499,
                    code: "if (true) {process.exit();}"
                })
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err);
                    should.exist(res);
                    should.exist(res.body);
                    response = res.body;
                    done();
                });
        });

        it('Should get a list of bus stops - should not execute code.', function (done) {
            request
                .get(uri)
                .query({
                    longitude: "if (true) {process.exit();}",
                    latitude: "if (true) {process.exit();}"
                })
                .expect(400)
                .end(function (err) {
                    should.not.exist(err);
                    done();
                });
        });


    });

    describe('Errors', function () {

        it('POST should 405', function (done) {
            request
                .post(uri)
                .expect(405)
                .end(function (err) {
                    should.not.exist(err);
                    done();
                });

        });

        it('PUT should 405', function (done) {
            request
                .put(uri)
                .expect(405)
                .end(function (err) {
                    should.not.exist(err);
                    done();
                });

        });

        it('DELETE should 405', function (done) {
            request
                .del(uri)
                .expect(405)
                .end(function (err) {
                    should.not.exist(err);
                    done();
                });

        });

    });

});
