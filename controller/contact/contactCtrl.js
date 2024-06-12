const AsyncHandler = require("express-async-handler");
const Contact = require("../../model/contact/Contact");


//@desc create order
//@route POST api/v1/contact
//@access public

exports.createContact = AsyncHandler(async(req,res)=>{
   const{name,email,message} = req.body;   
   // if email id has been exist
   const emailExist = await Contact.findOne({email});
   if(emailExist){
    return res.json({
        status:"failed",
        message:"Your email already exist"
    })
   }
   
   // create contact
   const contact = await Contact.create({name,email,message});
   res.status(201).json({
    status:"success",
    message:"Your message submitted successfully",
    data:contact
   })
   
})

//@desc get order
//@route GET api/v1/contact
//@access private

exports.getContact = AsyncHandler(async(req,res)=>{
    
    const findContact = await Contact.find({},{_id:0,name:1,message:1,email:1});
    res.status(201).json({
        status:"success",
        message:"Your contact fetched successfully",
        data:findContact
    })

})