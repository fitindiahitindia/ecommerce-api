const express = require("express");
const userRouter=express.Router();

const{
    userRegister,
    userLogin,
    getUserProfileCtrl,
    getAllUserProfileCtrl,
    updateUserStatus,
    userTokenVerify,
    getAdminPofile,
    updateAdminPassword
}=require("../../controller/auth/userCtrl.js");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const isAuthenticatedAdmin = require("../../middlewares/isAuthenticatedAdmin");
const roleRestrication = require("../../middlewares/roleRestriction");
const User = require("../../model/auth/User.js");
const Admins = require("../../model/auth/Admin.js");

userRouter.post("/register",userRegister)
userRouter.post("/login",userLogin)
userRouter.get("/profile", isAuthenticated(User), getUserProfileCtrl);
userRouter.get("/Allprofile", isAuthenticatedAdmin(Admins), getAllUserProfileCtrl);
userRouter.put("/status", updateUserStatus);
userRouter.get("/tokenVerify",isAuthenticated(User),userTokenVerify);
// userRouter.get("/adminProfile",isAuthenticatedAdmin(Admins),getAdminPofile);
// userRouter.post("/adminPassword",isAuthenticated(User),updateAdminPassword);


module.exports = userRouter; 