const AysncHandler = require("express-async-handler");
const Order = require("../../model/order/Order");
const OrderItem = require("../../model/order/Order-item");



//@desc create order
//@route POST api/v1/order
//@access public 

exports.createOrder = AysncHandler(async (req, res) => {
    const{orderItems,shippingAddress1,shippingAddress2,city,zip,country,phone,status,totalPrice,user,state} = req.body

    const orderItemsIds = Promise.all(orderItems.map(async(orderItem)=>{
        let newOrderItem = new OrderItem({
            quantity:orderItem.quantity,
            product:orderItem.product
        })
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
    }))
    
    const orderItemsIdsResolved = await orderItemsIds;

    const order = new Order({
        orderItems:orderItemsIdsResolved,
        shippingAddress1:shippingAddress1,
        shippingAddress2:shippingAddress2,
        city:city,
        state:state,
        zip:zip,
        country:country,
        phone:phone,
        status:status,
        totalPrice:totalPrice,
        user:user
    })
    const createOrd = await order.save()

    res.status(201).json({
        status: "success",
        message: "order created",
        data: createOrd
    })
})

//@desc get order
//@route GET api/v1/order
//@access public

exports.getOrder = AysncHandler(async (req,res)=>{
    const orderList = await Order.find().populate({path:"orderItems",populate:"product"}).sort({"dateOrdered":-1});

    if(!orderList){
        throw new Error("Order not found")
    }
    
    res.status(201).json({
        status:"success",
        message:"order found successfully",
        data:orderList,
    })
})

//@desc get single order
//@route GET api/v1/order/:id
//@access private

exports.getSingleOrder = AysncHandler(async (req,res)=>{
    const singleOrderList = await Order.findById(req.params.id)
    .populate("user")
    .populate({path:"orderItems",populate:"product"})
    .sort({"dateOrdered":-1});
    if(!singleOrderList){
        throw new Error("Order not found");
    }
    const singleOrder = 
        [{
        orderId:{
            id:singleOrderList._id
        },
        billingDetails:{
           name:"xxx",
           email:"xxx",
           phone:singleOrderList.phone,
           address:{
            shippingAddress1:singleOrderList.shippingAddress1,
            shippingAddress2:singleOrderList.shippingAddress2,
            city:singleOrderList.city,
            zip:singleOrderList.zip,
            state:singleOrderList.state,
            country:singleOrderList.country,
           },
        },

        orders:singleOrderList.orderItems,

        orderSummary:{
            quantity:singleOrderList.orderItems.length,
            shipping:0,
            charge:0,
            total:0,
            status:singleOrderList.status
        },
        user:{
            name:singleOrderList.user.name,
            email:singleOrderList.user.email
        }
}]

    
    res.status(201).json({
        status:"success",
        message:"single order found successfully",
        data:singleOrder,
    })
})



