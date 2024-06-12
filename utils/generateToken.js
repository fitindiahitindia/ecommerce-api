const jwt = require('jsonwebtoken');
var fs = require('fs');

const generateToken = id => {
   const jwtGen=jwt.sign({id},"user",{expiresIn: "1d" });
   fs.appendFile('utils/tokenGenerate.txt',`${jwtGen}`+"\n",function(err){Error(err)});
   return jwtGen;
};


module.exports = generateToken;
