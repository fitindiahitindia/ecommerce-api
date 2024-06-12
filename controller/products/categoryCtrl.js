const AysncHandler = require("express-async-handler");
const Category = require("../../model/product/Category");
//@desc get product category
//@route GET api/v1/category
//@acess private

exports.getProductCategory = AysncHandler(async(req,res)=>{
    const getCategory = await Category.find()
    res.status(201).json({
        status:"success",
        message:"product fetched successfully",
        data:getCategory,
    })
})

//@desc create product category
//@route POST api/v1/category
//@acess private
exports.createProductCategory = AysncHandler(async(req,res)=>{
    const{categoryName}=req.body;
    //validation
    if(!categoryName){
       return res.json({
            message:"category name is required"
        })
    }
    else if(typeof(categoryName)!=="string"){
        return res.json({
            message:"category name should be string"
        })
    }
    const categoryExist = await Category.findOne({categoryName});
    if(categoryExist){
       return res.json({
            message:"category is already exist"
        })
    }
    const createCategory = await Category.create({
        categoryName,
        admin:req.adminAuth._id
    })
    res.status(201).json({
        status:"success",
        message:"category created successfully",
        data:createCategory,
    })
})

//@desc update product category
//@route PUT api/v1/category
//@acess private

exports.updateProductCategory = AysncHandler(async(req,res)=>{
    const {categoryName} = req.body;
    const updateById = await Category.findByIdAndUpdate(
        req.params.id,
        {
        categoryName
        }
    )
    res.status(201).json({
        status:"success",
        message:"category updated successfully",
        data:updateById
    })
})

//@desc delete product category
//@route Delete api/v1/category
//@acess private

exports.deleteProductCategory = AysncHandler(async(req,res)=>{
    await Category.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status:"success",
        message:"category deleted successfully",
    })
})