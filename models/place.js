var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
var Place = mongoose.model('Place',{
  name : {
    type : String,
    required : true,
    trim : true
  },
  lat : {
    type : Number,
    required : true,
  },
  lng : {
    type : Number,
    required : true,
  },
  address : {
    type : String,
    required : true,
    trim : true
  },
  rating : {
    type : Number,
    required : true,
  },
  place_id : {
    type : String,
    required : true,
    trim : true
  }
})

module.exports = {Place};
