var {Place} = require('./../models/place');
var {mongoose} = require('./../db/mongoose');

// var teste = new Place({
//   name : "Ignorar",
//   lat : 25,
//   lng : 25,
//   address : "Você encontrou um easteregg",
//   rating : 5,
//   place_id : "abcdef1234"
// })
//
// teste.save().then((doc) => {
//   console.log(doc)
// }).catch((e) => {
//   console.log(e);
// })

Place.find().then((places)=>{
  console.log(places)
}).catch((e) => {
  console.log(e)
})
