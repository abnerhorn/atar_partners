var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOD_URI || 'mongodb://localhost:27017/atarpartners').then(()=>{
  console.log("DB connected")
}).catch((e)=>{
  console.log(`Error connecting to DB ${e}`)
});

module.exports={mongoose};
