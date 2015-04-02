# muber
Municipal transportation 


## TODO:
 [] stops end point need a stops/:id and stops get many
 [] need to be able to get by long lat
    http://docs.mongodb.org/manual/reference/operator/query/near/
 [X] scrape base data from nextbus
 [X] figure out model for stops. currently it seems to be the only practical endpoint
 [] build predictions api wrapper
 [] build frontend


Queries
```javascript
{
  $near: {
     $geometry: {
        type: "Point" ,
        coordinates: [ -122.41737, 37.8072499 ]
     },
     $maxDistance: 1600,
     $minDistance: 0
  }
}
```
