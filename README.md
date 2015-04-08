# muber-api
Municipal transportation API. Data is a Copyright (c) [NextBus](http://www.nextbus.com) and it's Associates

Project code: The MIT License (MIT) Copyright (c) 2015 Taylor Kisor-Smith

##Live [Demo](https://api-muber.herokuapp.com/v1/stops?longitude=-122.417541&latitude=37.775245&distance=0.1)

## Break Down:
Muber is built across three different repositories:

* [muber](https://github.com/t4ks/muber) - Muber's RESTful API - **You are currently here!**
* [muber-ui](https://github.com/t4ks/muber-ui) - Muber's web UI
* [rest-engine](https://github.com/t4ks/rest-engine) - a wrapper/micro framework that makes it simple to spin up a RESTful service,
    built on top of [Restify](https://www.npmjs.com/package/restify)

I split it up this way to really show the separation between the client and the API. This is also why I choose a "smaller"
framework - Restify, compared to using Express; I just wanted my API to be an API.

### How to run:
```bash
npm install && NODE_ENV=staging npm start
```

## TODO:
 * [X] stops end point need a stops/:id and stops get many
 * [X] need to be able to get by long lat -http://docs.mongodb.org/manual/reference/operator/query/near/
 * [X] scrape stops from nextbus
 * [X] figure out model for stops. currently it seems to be the only practical endpoint
 * [X] build predictions/departures api wrapper / endpoint
 * [X] Error handling
 * [X] build frontend


### Functional Spec
* Option one of coding challenge: "Create a service that gives real-time departure time for public transportation (use freely available public API). The app should geolocalize the user."
* Serves Bus times and Bus stop locations via an RESTful JSON interface
* Data is from a freely available public API [NextBus](http://www.nextbus.com)

###Tech Spec
* Node.js RESTful API built on top of [rest-engine](https://github.com/t4ks/rest-engine).
* MongoDB for Bus Stop storage and querying.
* Node and npm makes it really easy to decouple the app into multiple projects, along with easy deployments to [Heroku](https://www.heroku.com)
* All data, whether piped from MongoDB or NextBus, goes through transformation in order to make consistent and formatted data to the clients

###Additional
* I developed rest-engine, as mentioned above. It makes declaring specific API and its routes a simple configuration and bootstraps onto correctly formatted projects.
* I developed a Scraper to get static data and add its own database. There is no good reason to proxy all requests to NextBus.
    * Specifically scraped all the stops.
    * This allowed for a more custom data model and added ease for geo querying with MongoDB

##API Definitions

### /v1/stops

####GET /v1/stops

Query parameters:

* ```longitude``` - current longitude of client (required)
* ```latitude``` - current latitude of the client (required)
* ```distance``` - radius to be searched in miles (optional)

Request:
``` GET /v1/stops?longitude=-122.417541&latitude=37.775245&distance=0.06 ```

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
                "calculated": 0.03971779371739633
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
                "calculated": 0.05635467535932622
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
                "calculated": 0.05691870115045141
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

####GET /v1/stops/:id/departures

A list of departures are returned for a given stop - real time and always changing

Request:
```GET /v1/stops/551e1d05389e2eb02954c313/departures```

Response Body:
```javascript
{
    "count": 1,
    "results": [
        {
            "agencyTitle": "San Francisco Muni",
            "routeTitle": "6-Parnassus",
            "routeTag": "6",
            "stopTitle": "11th St Between Market & Mission",
            "stopTag": "7408",
            "directions": [
                {
                    "title": "Outbound to Van Ness",
                    "timeTable": [
                        {
                            "epochTime": "1428392600158",
                            "seconds": "578",
                            "minutes": "9",
                            "vehicle": "5476"
                        },
                        {
                            "epochTime": "1428394338133",
                            "seconds": "2316",
                            "minutes": "38",
                            "affectedByLayover": "true",
                            "vehicle": "5448"
                        }
                    ]
                }
            ]
        }
    ],
    "copyright": "All data copyright San Francisco Muni 2015.",
    "stop": {
        "id": "551e1d05389e2eb02954c313",
        "href": "/v1/stop/551e1d05389e2eb02954c313"
    },
    "self": {
        "id": "551e1d05389e2eb02954c313",
        "href": "/v1/stop/551e1d05389e2eb02954c313/departures"
    }
}
```
