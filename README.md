# muber-api
Municipal transportation API. Data provided by (c) http://www.nextbus.com and it's associates

Live [Demo](https://api-muber.herokuapp.com/v1/stops?longitude=-122.417541&latitude=37.775245&distance=0.1)

## Break Down:
Muber is built across three different repositories:

* [muber](https://github.com/t4ks/muber) - Muber's RESTful API - **You are currently here!**
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
 * [X] build frontend

##API Definitions

### /v1/stops

####GET /v1/stops

Query parameters:

* ```longitude``` (required)
* ```latitude``` (required)
* ```distance``` - radius to be searched in miles (optional)

Request:
``` GET /v1/stops?longitude=-122.417541&latitude=37.775245&distance=0.1 ```

Response Body:
```javascript
{
    "count": 3,
    "results": [
        {
            "stopId": "17408",
            "name": "11th St Between Market & Mission",
            "agency": "sf-muni",
            "routes": [
                {
                    "route": "6",
                    "stop": "7408"
                }
            ],
            "distance": {
                "calculated": 0.03971779371739633,
                "location": {
                    "coordinates": {
                        "longitude": -122.41825,
                        "latitude": 37.7751199
                    }
                }
            },
            "location": {
                "coordinates": {
                    "longitude": -122.41825,
                    "latitude": 37.7751199
                }
            },
            "self": {
                "id": "551e1d05389e2eb02954c313",
                "href": "/v1/stops/551e1d05389e2eb02954c313"
            },
            "departures": {
                "id": "551e1d05389e2eb02954c313",
                "href": "/v1/stops/551e1d05389e2eb02954c313/departures"
            }
        },
        {
            "stopId": "13244",
            "name": "11th St & Market St",
            "agency": "sf-muni",
            "routes": [
                {
                    "route": "6",
                    "stop": "3244"
                },
                {
                    "route": "9",
                    "stop": "3244"
                },
                {
                    "route": "9L",
                    "stop": "3244"
                }
            ],
            "distance": {
                "calculated": 0.05635467535932622,
                "location": {
                    "coordinates": {
                        "longitude": -122.41852,
                        "latitude": 37.7754999
                    }
                }
            },
            "location": {
                "coordinates": {
                    "longitude": -122.41852,
                    "latitude": 37.7754999
                }
            },
            "self": {
                "id": "551e1d05389e2eb02954c339",
                "href": "/v1/stops/551e1d05389e2eb02954c339"
            },
            "departures": {
                "id": "551e1d05389e2eb02954c339",
                "href": "/v1/stops/551e1d05389e2eb02954c339/departures"
            }
        },
        {
            "stopId": "13245",
            "name": "11th St & Market St",
            "agency": "sf-muni",
            "routes": [
                {
                    "route": "9",
                    "stop": "3245"
                },
                {
                    "route": "9L",
                    "stop": "3245"
                }
            ],
            "distance": {
                "calculated": 0.05691870115045141,
                "location": {
                    "coordinates": {
                        "longitude": -122.41857,
                        "latitude": 37.7753699
                    }
                }
            },
            "location": {
                "coordinates": {
                    "longitude": -122.41857,
                    "latitude": 37.7753699
                }
            },
            "self": {
                "id": "551e1d05389e2eb02954c3b1",
                "href": "/v1/stops/551e1d05389e2eb02954c3b1"
            },
            "departures": {
                "id": "551e1d05389e2eb02954c3b1",
                "href": "/v1/stops/551e1d05389e2eb02954c3b1/departures"
            }
        }
    ],
    "location": {
        "longitude": -122.417541,
        "latitude": 37.775245
    }
}
```

####GET /v1/stops/:id

A stop returned in this way does not have 

Parameters:
* ```id``` - id of the stop (required)

Request:
```GET /v1/stops/551e1d05389e2eb02954c313```

Response Body:
```javascript
{
    "stopId": 17408,
    "name": "11th St Between Market & Mission",
    "agency": "sf-muni",
    "routes": [
        {
            "stop": "7408",
            "route": "6"
        }
    ],
    "location": {
        "coordinates": {
            "longitude": -122.41825,
            "latitude": 37.7751199
        }
    },
    "self": {
        "id": "551e1d05389e2eb02954c313",
        "href": "/v1/stops/551e1d05389e2eb02954c313"
    },
    "departures": {
        "id": "551e1d05389e2eb02954c313",
        "href": "/v1/stops/551e1d05389e2eb02954c313/departures"
    }
}
```

### Functional Spec
* Option one of coding challenge: "Create a service that gives real-time departure time for public transportation (use freely available public API). The app should geolocalize the user."
* Serves Bus times and Bus stop locations via an RESTful JSON interface

###Tech Spec
* Data provider [NextBus](http://www.nextbus.com)
* Node.js RESTful API built using on top of [rest-engine](https://github.com/t4ks/rest-engine). I have about 8 months experience with Node.js systems.
* MongoDB for Bus Stop storage and querying.
* Node and npm makes it really easy to decouple the app into multiple projects, along with easy deployments to [Heroku](https://www.heroku.com)
* All data whether piped from Mongo or nextbus goes through transformation in order to make consistent and formatted data to the clients

###Additional
* I developed a Scraper to get static data and add its own database. There is no good reason to proxy all requests to NextBus.
    * Specifically scraped all the stops.
    * This allowed for a more custom data model and added ease for geo querying with MongoDB
