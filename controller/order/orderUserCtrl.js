const AysncHandler = require("express-async-handler");
const Order = require("../../model/order/Order");


//@desc get user orders
//@route POST /api/v1/user/orders/:id
//@access public 

exports.getOrders = AysncHandler(async(req,res)=>{

  const getOrd= await Order.find({"user":req.userAuth._id}).populate({path:"orderItems",populate:"product"});
  res.status(201).json({
    status:"success",
    message:"user order fetched details successfully",
    data:getOrd
  })
})




