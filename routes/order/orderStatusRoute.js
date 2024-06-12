const express = require("express");
const orderStatusRouter = express.Router();

const{
    changeOrderStatus, getOrderStatus
}=require("../../controller/order/orderStatusCtrl");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const User = require("../../model/auth/User");

orderStatusRouter.route('/:id').post(changeOrderStatus);
orderStatusRouter.route('/:id').get(getOrderStatus);

module.exports = orderStatusRouter