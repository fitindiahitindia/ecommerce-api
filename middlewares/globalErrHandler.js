var fs = require('fs');
const path = "middlewares/Logs.txt";
const globalErrHandler = (err, req, res, next) => {
  //status
  //message 
  //stack
  const stack = err.stack;
  const message = err.message;
  const status = err.status ? err.status : "failed";
  const statusCode = err.statusCode ? err.statusCode : 500;

  //log error
  if(fs.existsSync){
    fs.appendFile(path,
    `${status}`+"\n"+`${message}`+"\n"+`${stack}`+"\n"+"\n"+`${Date()}`+"\n"+"\n",
    function(err){Error(err)
    });
  }else{
    fs.write(path,
      `${status}`+"\n"+`${message}`+"\n"+`${stack}`+"\n"+"\n"+`${Date()}`+"\n"+"\n",
      function(err){Error(err)
      });
  } 
  
  
  res.status(statusCode).json({
    status,
    message,
    stack,
  });

};

//Not found
const notFoundErr = (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server`);
  next(err);
};

module.exports = { globalErrHandler, notFoundErr };
