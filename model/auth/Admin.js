const mongoose = require("mongoose");

const adminScheme = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            default:"admin",
        },
        status:{
            type:Boolean,
            required:true,
            default:true
          },
    },{timestamps:true}
    )

//model
const Admins = mongoose.model("Admins",adminScheme);
module.exports = Admins;