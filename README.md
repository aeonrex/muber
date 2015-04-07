# muber-api
Municipal transportation API. Data provided by (c) http://www.nextbus.com and it's associates

## Break Down:
Muber is built across three different repositories:

* [muber](https://github.com/t4ks/muber) - Muber's RESTful API - You are currently here!
* [muber-ui](https://github.com/t4ks/muber-ui) - Muber's web UI
* [rest-engine](https://github.com/t4ks/rest-engine) - a wrapper/micro framework that makes it simple to spin up a RESTful service,
    built on top of [Restify](https://www.npmjs.com/package/restify)

## TODO:
 * [X] stops end point need a stops/:id and stops get many
 * [X] need to be able to get by long lat -http://docs.mongodb.org/manual/reference/operator/query/near/
 * [X] scrape base data from nextbus
 * [X] figure out model for stops. currently it seems to be the only practical endpoint
 * [X] build predictions/departures api wrapper / endpoint
 * [X] Error handling
 * [ ] build frontend

###Tech Spec
* Node.js api built off of Restify
