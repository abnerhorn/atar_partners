var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Place} = require('./models/place');

const port = process.env.PORT || 4747;


var app = express();
app.use(bodyParser.json());

app.get('/',(req,res) => {
  res.sendFile('./html/index.html', {root : __dirname});

})

app.get('/upload',(req,res)=>{
  res.send("Works")
})

app.post('/upload',(req,res) => {

  var place = new Place({
    name : req.body.name,
    lat : req.body.lat,
    lng : req.body.lng,
    address : req.body.address,
    rating : req.body.rating,
    place_id : req.body.place_id
  });

  place.save().then((doc)=>{
    res.status(200).send(doc)
  }).catch((e) => {
    res.status(400).send(e)
  })

})

app.post('/cleardb',(req,res) => {
  Place.remove({}).then(()=>{
    res.send("DB cleared");
  }).catch((e) => {
    res.send(`Error : ${e}`)
  })
})

app.get('/show/:lat/:lng',(req,res) => {
  var lat = req.params.lat;
  var lng = req.params.lng;

  Place.find().then((places)=>{
    var distance = (lat1, lon1, lat2, lon2) => {
      var p = 0.017453292519943295;
      var c = Math.cos;
      var a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))/2;
     return 12742 * Math.asin(Math.sqrt(a));
    };

    var showPlaces = (arr,x,y) => {
      for (i in arr){
        arr[i]._doc.distance = distance(x,y,arr[i].lat,arr[i].lng);
      }
      arr.sort(function(a, b) {
        return parseFloat(a._doc.distance) - parseFloat(b._doc.distance);
      })

      return arr.splice(0,4);
    }

    res.status(200).send(showPlaces(places,lat,lng));

  }).catch((e) => {
    res.status(400).send(e);
  })
})


app.listen(port,()=>{
  console.log(`Connection started in port ${port}`);
})

module.exports = {app};
