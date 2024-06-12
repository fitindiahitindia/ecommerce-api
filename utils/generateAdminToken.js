const jwt = require('jsonwebtoken');
var fs = require('fs');

const generateAdminToken = id =>{
   const jwtGen=jwt.sign({id},"admin",{expiresIn: "1d" });
   fs.appendFile('utils/tokenGenerateAdmin.txt',`${jwtGen}`+"\n",function(err){Error(err)});
   return jwtGen;
}

module.exports = generateAdminToken;