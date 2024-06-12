const AysncHandler = require("express-async-handler");
const Blog = require("../../model/blog/Blog");


//@desc create blog
//@route POST api/v1/blog
//@access public

exports.createBlog = AysncHandler(async(req,res)=>{
    const{title,category,content,image} = req.body;
    //check if exist
    const blogExist = await Blog.findOne({title});
    if(blogExist){
        throw new Error("Blog already exist");
    }

     //create blog
     const createBlog = await Blog.create({
        title,
        content,
        category,
        image,
    })
    res.status(201).json({
        status:"success",
        message:"Create Blog successfully",
        data:createBlog,
    })
})


//@desc get single blog
//@route GET api/v1/blog/byId/:id
//@access public

exports.getBlogById = AysncHandler(async(req,res)=>{
    const blogById  = await Blog.findById(req.params.id);
    if(!blogById){
       throw new Error("blog does not exist")
    }

    const blogByIdObj={
        id:blogById._id,
        blogId:blogById.blogId,
        title:blogById.title,
        content:blogById.content,
        category:blogById.category,
        image:blogById.image,
        createBlogDate:blogById.createdBlogDate,
    }
    res.status(201).json({
       status:"success",
       message:"blog fetched successfully",
       data:blogByIdObj
    })
}) 


//@desc get all blogs
//@route GET api/v1/blog
//@access public

exports.getBlog = AysncHandler(async(req,res)=>{
    const blogs = await Blog.find();
    res.status(201).json({
        status:"success",
        message:"blogs fetched successfully",
        data:blogs,
    })
}) 
