const AysncHandler = require("express-async-handler");
const Product = require("../../model/product/Product");
const Category = require("../../model/product/Category");

//@desc create product
//@route POST api/v1/product
//@acess private

exports.createProduct = AysncHandler(async(req,res)=>{
    const {name,description,type,image,quantity,price,oldPrice} = req.body;

    //check if exist
    const productExist = await Product.findOne({name})
    if(productExist){
        throw new Error("product already exist");
    } 
    //create product
    const createPro = await Product.create({
        name,
        description,
        type,
        image,
        quantity,
        price,
        oldPrice,
        admin:req.adminAuth._id
    })
    res.status(201).json({
        status:"success",
        message:"product created successfully",
        data:createPro,
    })
})

//@desc get all product
//@route GET api/v1/product
//@access public

exports.getProduct = AysncHandler(async(req,res)=>{
    const product = await Product.find();
    res.status(201).json({
        status:"success",
        message:"product fetched successfully",
        data:product,
    })
})

//@desc get single product
//@route GET api/v1/product/:id
//@access public

exports.getProductById = AysncHandler(async(req,res)=>{
     const productById  = await Product.findById(req.params.id)
     if(!productById){
        throw new Error("product does not exist")
     }
     res.status(201).json({
        status:"success",
        message:"product fetched successfully",
        data:productById
     })
}) 
 
//@desc update Single Product
//@route PUT api/v1/product/:id
//@access private

exports.updateProductById = AysncHandler(async(req,res)=>{
    const {name,description,type,image,quantity,price,oldPrice} = req.body;
    const updateById = await Product.findByIdAndUpdate(
        req.params.id,
        {
         name,description,type,image,quantity,price,oldPrice
        }
    )
    res.status(201).json({
        status:"success",
        message:"product updated successfully",
        data:updateById
    })
})
 
//@desc delete product
//@route DELETE api/v1/product/:id
//@acess private

exports.deleteProduct = AysncHandler(async(req,res)=>{
        await Product.findByIdAndDelete(req.params.id);

        res.status(201).json({
            status:"success",
            message:"product deleted successfully"
        })
})




