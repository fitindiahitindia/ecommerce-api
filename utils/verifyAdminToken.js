const jwt = require("jsonwebtoken");


const verifyAdminToken = token => {
  return jwt.verify(token,"admin", (err,decoded) => {
    if (err) {
      return true
    } else {
      return decoded;
    }
  });
  
};

module.exports = verifyAdminToken;
