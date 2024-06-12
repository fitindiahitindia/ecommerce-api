const mongoose = require("mongoose");

const countrySchema =new mongoose.Schema({

 country:{
   type:String,
   required:true
 },
 countryCode:{
    type:String,
    required:true
 },
 countryId:{
    type:String,
    required:true
 }
})

//model
const Country = mongoose.model("Countries",countrySchema);

module.exports = Country;
