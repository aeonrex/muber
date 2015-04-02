# muber
Municipal transportation 


## TODO:
 * stops end point need a stops/:id and stops get many
    * need to be able to get by long lat
    http://docs.mongodb.org/manual/reference/operator/query/near/

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
