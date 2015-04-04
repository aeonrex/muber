'use strict';

var log = require('util').log,
    request = require('request'),
    stopModel = require('../models/stops');

function DeparturesDataProvider(model) {
    this.model = model;
}


/*
 {
 "stopId": 135184,
 "name": "Jones St & Beach St",
 "agency": "sf-muni",
 "routes": [
 {
 "stop": "35184",
 "route": "F"
 }
 ],
 "location": {
 "coordinates": {
 "longitude": -122.41737,
 "latitude": 37.8072499
 }
 },
 "id": "551e1d05389e2eb02954c0c9"
 }
 */

/*
 1) http://webservices.nextbus.com/service/publicXMLFeed?command=predic
 tions&a=<agency_tag>&stopId=<stop id>

 2) http://webservices.nextbus.com/service/publicXMLFeed?command=predic
 tions&a=<agency_tag>&stopId=<stop id>&routeTag=<route tag>

 3) http://webservices.nextbus.com/service/publicXMLFeed?command=prediction
 s&a=<agency_tag>&r=<route tag>&s=<stop tag>
 */

DeparturesDataProvider.prototype.getMany = function (stopId, callback) {
    // the client should send stop mongo id's
    // get the docs get the stuff needed to query nextbus
    stopModel.getOne(stopId, function (err, stop) {
        if (err) return log(err);
        log(JSON.stringify(stop, null, '\t'));
    });
};

module.exports = DeparturesDataProvider;
