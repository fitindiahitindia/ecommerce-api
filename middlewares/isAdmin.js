const Admins = require("../model/auth/Admin");

const isAdmin = async (req, res, next) => {
  //find the user 
  const userId = req?.adminAuth?._id;
  if(userId==undefined || userId == null){
    const err = new Error("Token Missing");
    return res.json({
      status:"failed",
      message:"Token is required"
  })
 }
  const adminFound = await Admins.findById({_id:userId});
  //check if admin
  if(adminFound?.role === 'admin'){
    next();
  }else{
    next(new Error("Access Denied, admin only"));
  }
};
 
module.exports = isAdmin;
