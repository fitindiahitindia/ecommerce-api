const AysncHandler = require("express-async-handler");
const Order = require("../../model/order/Order");

//@desc Post change order status
//@route POST api/v1/orderStatus/:id
//@access private

exports.changeOrderStatus = AysncHandler(async(req,res)=>{
    const{status}=req.body;
    const paramsId = req.params.id;

    if(!status){
        return res.send("status is required")
    }
    if(status == "packaging" || status == "delivered" || status == "pending" || status == "out of delivery" || status == "cancelled"){
        const changeOrder = await Order.updateOne({_id:paramsId},{$set:{status:status}});
        res.status(201).json({
            status:"success",
            message:"order status has changed successfully",
        })
    }else{
        return res.send("please select status correctly")
    }

    
})

//@desc get change order status
//@route GET api/v1/orderStatus/:id
//@access private

exports.getOrderStatus = AysncHandler(async(req,res)=>{
    const singleOrderList = await Order.findById(req.params.id,{"status":1})
    .sort({"dateOrdered":-1});
    
    res.status(201).json({
     status:"success",
     message:"order status fetched details successfully",
     orderStatus:singleOrderList.status
})
})