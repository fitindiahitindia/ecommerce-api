const AysncHandler = require("express-async-handler");
const Product = require("../../model/product/Product");

//@desc get product for best seller
//@route GET api/v1/bestSeller
//@acess public

exports.bestSeller = AysncHandler(async(req,res)=>{
    const bestSellerData = await Product.find();
    if(!data){
        res.status(201).json({
            status:"success",
            message:"product does not have",
    })  
    }
    res.status(201).json({
        status:"success",
        message:"product fetched successfully",
        data:bestSellerData
     })
})