const jwt = require("jsonwebtoken");

const verifyToken = token => {
  return jwt.verify(token,"user", (err,decoded) => {
    if (err) {
      return true
    } else {
      return decoded;
    }
  });
  
};

module.exports = verifyToken;
