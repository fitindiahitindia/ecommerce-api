const AsyncHandler = require("express-async-handler");
const Review = require("../../model/product/Review");
//@desc post product for review
//@route POST api/v1/review
//@acess public

exports.createProductReview = AsyncHandler(async(req,res)=>{
   const{productId,name,email,phone,ratting,rattingMsg}=req.body;

   // if user has already given review 
   const emailExist = await Review.findOne({email});
   if(emailExist){
    return res.json({
        status:"failed",
        message:"You have already given review",
       })
   }
   // create review
   const createReview = await Review.create({
    productId,name,email,phone,ratting,rattingMsg
   })
   res.status(201).json({
    status:"success",
    message:"ratting is successfully submited",
    data:createReview
   })
})

//@desc get product for review
//@route GET api/v1/review
//@acess private

exports.getProductReview = AsyncHandler(async(req,res)=>{

    const getProductRev = await Review.find();
    
    res.status(201).json({
        status:"success",
        message:"ratting fetched successfully",
        data:getProductRev
       })

})