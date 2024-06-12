const AysncHandler = require("express-async-handler")
const Country = require("../../model/country/Country");
const State = require("../../model/country/State");

//@desc get country
//@route GET api/v1/country
//@acess public

exports.getCountry = AysncHandler(async(req,res)=>{
  
    const findCounty = await Country.find({},{_id:0,countryCode:0});
    res.status(201).json({
        status:"success",
        message:"country fetched successfully",
        data:findCounty
    })
}) 

//@desc post state
//@route POST api/v1/state
//@acess public

exports.getState = AysncHandler(async(req,res)=>{
    const{country} = req.body;
    const findState = await State.find({country},{_id:0,country:0,stateCode:0});
    if(findState.length <=0){
    return res.json({
        status:"success",
        message:"data null or country name is incorrect",
    })
    }
    
    res.status(201).json({
        status:"success",
        message:"state fetched successfully",
        data:findState
    })
}) 
