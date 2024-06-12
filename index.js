const http = require("http");
require("dotenv").config();
require("./config/dbConnection");
const app = require('./app/app')

const PORT = process.env.PORT || 5000 
// server
const server = http.createServer(app);
server.listen(PORT,console.log(`Server is running on port ${PORT}`));


// you can fire this rquery for nodemon::: "npm run start"
// you can fire this rquery for nodemon::: "npm run server"
