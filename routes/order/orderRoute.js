const express = require("express");
const orderRouter = express.Router();

const{
    createOrder,getOrder,getSingleOrder, changeOrderStatus, getOrderStatus
}=require("../../controller/order/orderCtrl");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const User = require("../../model/auth/User");

orderRouter.route('/').post(createOrder);
orderRouter.route('/').get(getOrder);
orderRouter.get('/:id',getSingleOrder)

module.exports = orderRouter