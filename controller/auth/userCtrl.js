const AysncHandler = require('express-async-handler');
const User = require('../../model/auth/User');
const Os = require('os')
const {
    hashPassword,
    isPassMatched
} = require('../../utils/helpers');
const generateToken = require("../../utils/generateToken");
const verifyToken = require('../../utils/verifyToken');
const Admins = require('../../model/auth/Admin');


//@desc register user
//@route POST api/v1/userAuth/register
//@acess public

exports.userRegister = AysncHandler(async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    
    var decodedPassword = atob(password).split('_')[0]
    // is user exist
    const isUserFound = await User.findOne({
        email
    })
    if (isUserFound) {
        throw new Error('User Already Exist')
    } else if (!name) {
        throw new Error('Name is Required')
    } else if (!email) {
        throw new Error('Email is Required')
    } else if (!password) {
        throw new Error('Password is Required')
    }

    //register
    const user = await User.create({
        name,
        email,
        password: await hashPassword(decodedPassword)
    });
    res.status(201).json({
        status: "success",
        data: user,
        message: "user registered successfully"
    });
})

//@desc login user
//@route POST api/v1/userAuth/login
//@acess public

exports.userLogin = AysncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;
    
    var decodedPassword = atob(password).split('_')[0]
    
    //find user
    if (email == "" || email == null) {
        return res.json({
            message: "email is required"
        })
    }
    if (password == "" || password == null) {
        return res.json({
            message: "password is required"
        })
    }
    const findUser = await User.findOne({
        email
    });
    if(findUser){
        const status = findUser.status;

        if(status===false){
            return res.json({
                status: "failed",
                message: "Account is disabled",
            })
        }
    }
   
    if (!findUser) {
        return res.json({
            message: "Invalid login crendentials",
            status: "failed"
        })
    }
    //find password
    const findPassword = await isPassMatched(decodedPassword, findUser.password);
    if (!findPassword) {
        return res.json({
            message: "Invalid login crendentials",
            status: "failed"
        })
    } else {
       
        return res.json({
            status: "success",
            data: generateToken(findUser._id),
            message: "User logged in successfully",
        });
    }
})

//@desc     Get single admin
//@route    GET /api/v1/userAuth/profile
//@access   Private

exports.getUserProfileCtrl = AysncHandler(async (req, res) => {

    const user = await User.findById(req.userAuth._id);
    const userPrfile = {
        id:user._id,
        name: user.name,
    }
    if (!user) {
        throw new Error("User Not Found");
    } else {
        res.status(200).json({
            status: "success",
            data: userPrfile,
            message: "User profile fetched successfully",
        });
    }
});

//@desc     Get all user
//@route    GET /api/v1/userAuth/Allprofile
//@access   Private

exports.getAllUserProfileCtrl = AysncHandler(async (req, res) => {

    const user = await User.find({},{"_id":1,"name":1,"email":1,"status":1});
    // const alluserPrfile = {
    //     name: user.name,
    // }
    if (!user) {
        throw new Error("User Not Found");
    } else {
        res.status(200).json({
            status: "success",
            message: "User profile fetched successfully",
            data: user,
        });
    }
});

//@desc     update user status
//@route    GET /api/v1/userAuth/status/:id
//@access   Private
exports.updateUserStatus = AysncHandler(async (req, res) => {
    
    const user = await User.findByIdAndUpdate(req.body.userId,{status:req.body.status});
        res.status(200).json({
            status: "success",
            message: "user status update successfully",
        });
});

//@desc     get user token verify
//@route    GET /api/v1/userAuth/tokenVerify
//@access   private
exports.userTokenVerify = AysncHandler(async (req,res)=>{
   const{token} = req.body;
   const verify = await verifyToken(token);
   if(verify===true){
    res.status(200).json({
        status: "success",
        message: "user authenticate successfully",
        auth:true,
    });
   }else{
    res.status(200).json({
        status: "failed",
        message: "user authenticate failed",
        auth:false,
    });
   }
})

//@desc     get admin profile
//@route    GET /api/v1/userAuth/adminProfile
//@access   private

exports.getAdminPofile = AysncHandler(async (req, res) => {
    const user = await Admins.findById(req.adminAuth._id);
    const userPrfile = {
        name: user.name,
        email: user.email,
        date:user.createdAt
    }
    if (!user) {
        throw new Error("User Not Found");
    } else {
        res.status(200).json({
            status: "success",
            message: "admin profile fetched successfully",
            data: userPrfile,
        });
    }
})

//@desc     put admin password
//@route    PUT /api/v1/userAuth/adminPassword
//@access   private

exports.updateAdminPassword = AysncHandler(async (req, res) => {
    const{oldpassword,newpassword,confirmpassword}=req.body;
    var decodedOldPasswords = atob(oldpassword).split('_')[0]
    var decodedNewPasswords =atob(newpassword).split('_')[0]
    var decodedConfirmPasswords =atob(confirmpassword).split('_')[0]

    if (decodedOldPasswords == "") {
        return res.json({
            status:"failed",
            message: "oldpassword is required"
        })
    }
    if (decodedNewPasswords == "") {
        return res.json({
            status:"failed",
            message: "newpassword is required"
        })
    }
    if (decodedConfirmPasswords == "") {
        return res.json({
            status:"failed",
            message: "confirmpassword is required"
        })
    }
    if(decodedNewPasswords !== decodedConfirmPasswords){
        return res.json({
            status:"failed",
            message: "newpassword and confimpassword are not matched"
        })
    }
    const findUser = await User.findOne(req.userAuth._id);
    const matchPsw = await isPassMatched(decodedOldPasswords,findUser.password)
    const encryptPsw =await hashPassword(decodedNewPasswords)
    if(matchPsw == true){
        const findUser = await User.findByIdAndUpdate(req.userAuth._id,{password:encryptPsw});
        res.status(200).json({
            status: "success",
            message: "password changed successfully",
        });
    }else{
        res.status(200).json({
            status: "failed",
            message: "old password is wrong",
        });
    }
    
})