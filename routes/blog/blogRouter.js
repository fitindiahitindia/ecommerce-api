const express = require("express");
const {createBlog,getBlogById,getBlog} = require("../../controller/blog/blogCtrl");
const { getBlogCategory,createBlogCategory,deleteBlogCategory,updateBlogCategory } = require("../../controller/blog/blogCategoryCtrl");
const isAuthenticatedAdmin = require("../../middlewares/isAuthenticatedAdmin");
const Admins = require("../../model/auth/Admin");

const blogRouter = express.Router();

blogRouter.post("/create",createBlog);
blogRouter.get("/byId/:id",getBlogById);
blogRouter.get("/",getBlog);

blogRouter.post("/category",isAuthenticatedAdmin(Admins),createBlogCategory);
blogRouter.get("/category",getBlogCategory);
blogRouter.get("/category/:id",getBlogById);
blogRouter.delete('/category/:id',deleteBlogCategory);
blogRouter.put('/category/:id',updateBlogCategory)


module.exports = blogRouter;
