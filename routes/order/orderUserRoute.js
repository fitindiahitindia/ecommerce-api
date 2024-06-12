const express = require("express");
const orderUserRouter = express.Router();

const{
    getOrders
}=require("../../controller/order/orderUserCtrl");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const User = require("../../model/auth/User");

orderUserRouter.get('/orders',isAuthenticated(User), getOrders);

module.exports = orderUserRouter