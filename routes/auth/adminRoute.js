const express = require("express");
const adminRoute=express.Router();

const { adminRegister, adminLogin, getAdminPofile,updateAdminPassword } = require("../../controller/auth/adminCtrl.js");
const isAuthenticatedAdmin = require("../../middlewares/isAuthenticatedAdmin.js");
const Admins = require("../../model/auth/Admin.js");

adminRoute.post("/register",adminRegister)
adminRoute.post("/login",adminLogin)
// adminRoute.get("/getProfile", getAdminPofile)
adminRoute.get("/adminProfile",isAuthenticatedAdmin(Admins),getAdminPofile);
adminRoute.post("/adminPassword",isAuthenticatedAdmin(Admins),updateAdminPassword);


module.exports = adminRoute; 