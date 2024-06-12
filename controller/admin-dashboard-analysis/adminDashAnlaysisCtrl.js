const AysncHandler = require('express-async-handler');
const Admins = require('../../model/auth/Admin');
const Product = require('../../model/product/Product');
const Order = require('../../model/order/Order');
const User = require('../../model/auth/User');
const Blog = require('../../model/blog/Blog');

//@desc     get admin dashboard analysis
//@route    Get /api/v1/adminDashboardAnalysis
//@access   private


exports.getAdminDashboardAnlaysis = AysncHandler(async(req,res)=>{

   try {
    
   } catch (error) {
    
   }
   const totalProducts = await Product.countDocuments();
   const totalOrders = await Order.countDocuments();
   const totalUsers = await User.countDocuments();
   const totalBlogs = await Blog.countDocuments();

   const analysis = {
    totalProducts:totalProducts,
    totalOrders:totalOrders,
    totalUsers:totalUsers,
    totalBlogs:totalBlogs
   }

   res.status(201).json({
    status:"success",
    message:"admin dashboard analysis fetched successfully",
    data:analysis
   })
})