'use strict';

var request = require('request'),
    stopModel = require('../models/stops');

function DeparturesDataProvider(model) {
    this.model = model;
}

/*
 1) http://webservices.nextbus.com/service/publicXMLFeed?command=predic
 tions&a=<agency_tag>&stopId=<stop id>

 2) http://webservices.nextbus.com/service/publicXMLFeed?command=predic
 tions&a=<agency_tag>&stopId=<stop id>&routeTag=<route tag>
 */

DeparturesDataProvider.getMany = function (data, callback) {
    // the client should send stop mongo id's
    // get the docs get the stuff needed to query nextbus

};

module.exports = DeparturesDataProvider;
