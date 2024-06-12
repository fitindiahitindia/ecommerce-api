const AysncHandler = require('express-async-handler');
const Admins = require('../../model/auth/Admin');
const {
    hashPassword,
    isPassMatched
} = require('../../utils/helpers');
const generateAdminToken = require("../../utils/generateAdminToken");
const verifyAdminToken = require('../../utils/verifyToken');

//@desc     register admin
//@route    POST /api/v/adminAuth/register
//@access   private

exports.adminRegister = AysncHandler(async(req,res)=>{
    const{name,email,password} = req.body;
    // var decodedPassword = atob(password).split('_')[0]

    //is admin exists

    const isAdminFind = await Admins.findOne({
        email
    })
    if (isAdminFind) {
        throw new Error('Admin Already Exist')
    } else if (!name) {
        throw new Error('Name is Required')
    } else if (!email) {
        throw new Error('Email is Required')
    } else if (!password) {
        throw new Error('Password is Required')
    }

     //register
     const admin = await Admins.create({
        name,
        email,
        password: await hashPassword(password)
    });
    res.status(201).json({
        status: "success",
        data: admin,
        message: "admin registered successfully"
    });
})

//@desc  admin login
//@route POST api/v1/adminAuth/login
//@acess private

exports.adminLogin = AysncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;
    
    // var decodedPassword = atob(password).split('_')[0]
    
    //find admin
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
    const findadmin = await Admins.findOne({
        email
    });
    if(findadmin){
        const status = findadmin.status;

        if(status===false){
            return res.json({
                status: "failed",
                message: "Account is disabled",
            })
        }
    }
   
    if (!findadmin) {
        return res.json({
            message: "Invalid login crendentials",
            status: "failed"
        })
    }
    //find password
    const findPassword = await isPassMatched(password,findadmin.password);
    if (!findPassword) {
        return res.json({
            message: "Invalid login crendentials",
            status: "failed"
        })
    } else {
        return res.json({
            status: "success",
            data: generateAdminToken(findadmin._id),
            message: "Admin logged in successfully",
        });
    }
})

//@desc     get admin profile
//@route    GET /api/v1/adminAuth/adminProfile
//@access   private

exports.getAdminPofile = AysncHandler(async (req, res) => {
    
    // if(req.adminAuth._id){
    // }
    const admin = await Admins.findById(req.adminAuth._id);
    const adminPrfile = {
        name: admin.name,
        email: admin.email,
        date:admin.createdAt
    }
    if (!admin) {
        throw new Error("User Not Found");
    } else {
        res.status(200).json({
            status: "success",
            message: "admin profile fetched successfully",
            data: adminPrfile,
        });
    }
})

//@desc     put admin password
//@route    PUT /api/v1/adminAuth/adminPassword
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
    const findUser = await Admins.findOne(req.adminAuth._id);
    const matchPsw = await isPassMatched(decodedOldPasswords,findUser.password)
    const encryptPsw =await hashPassword(decodedNewPasswords)
    if(matchPsw == true){
        const findUser = await Admins.findByIdAndUpdate(req.adminAuth._id,{password:encryptPsw});
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