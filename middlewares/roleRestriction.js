const roleRestrication = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.adminAuth.role)){
         throw new Error("You do not have permission to perform this action");
        }
        next();
    }
}

module.exports = roleRestrication;