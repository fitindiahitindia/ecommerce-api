const express = require("express");
const { createContact, getContact } = require("../../controller/contact/contactCtrl");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const Admin = require("../../model/Staff/AdminX");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const contactRouter = express.Router();


contactRouter.route("/").post(createContact)

contactRouter.route("/").get(getContact)

module.exports = contactRouter;