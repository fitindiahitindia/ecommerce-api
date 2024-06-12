const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
      productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
      },
      name:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true
      },
      phone:{
        type:Number,
        required:true
      },
      ratting:{
        type:Number,
        required:true
      },
      rattingMsg:{
        type:String,
        required:true
      },
    },
    {timestamps:true}
 )

const Review = mongoose.model("Review",reviewSchema);
module.exports = Review;