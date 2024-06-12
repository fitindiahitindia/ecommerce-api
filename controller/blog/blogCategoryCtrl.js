const AysncHandler = require("express-async-handler");
const BlogCategory = require("../../model/blog/BlogCategory");
//@desc get blog category
//@route GET api/v1/blog/category
//@acess private

exports.getBlogCategory = AysncHandler(async(req,res)=>{
    const getCategory = await BlogCategory.find()
    res.status(201).json({
        status:"success",
        message:"blog fetched successfully",
        data:getCategory,
    })
})

//@desc create blog category
//@route POST api/v1/blog/category
//@acess private
exports.createBlogCategory = AysncHandler(async(req,res)=>{
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
    const categoryExist = await BlogCategory.findOne({categoryName});
    if(categoryExist){
       return res.json({
            message:"category is already exist"
        })
    }
    const createCategory = await BlogCategory.create({
        categoryName,
        admin:req.adminAuth._id
    })
    res.status(201).json({
        status:"success",
        message:"blog category created successfully",
        data:createCategory,
    })
})

//@desc update blog category
//@route PUT api/v1/blog/category
//@acess private

exports.updateBlogCategory = AysncHandler(async(req,res)=>{
    const {categoryName} = req.body;
    const updateById = await BlogCategory.findByIdAndUpdate(
        req.params.id,
        {
        categoryName
        }
    )
    res.status(201).json({
        status:"success",
        message:"blog category updated successfully",
        data:updateById
    })
})

//@desc delete blog category
//@route Delete api/v1/blog/category
//@acess private

exports.deleteBlogCategory = AysncHandler(async(req,res)=>{
    await BlogCategory.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status:"success",
        message:"blog category deleted successfully",
    })
})