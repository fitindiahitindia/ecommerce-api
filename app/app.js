const express = require("express");
const cors = require("cors")
const {
  globalErrHandler,
  notFoundErr,
} = require("../middlewares/globalErrHandler");

const productRouter = require("../routes/product/productRoute");
const userRouter = require("../routes/auth/userRoute");
const orderRouter = require("../routes/order/orderRoute");
const reviewRouter = require("../routes/product/reviewRoute");
const contactRouter = require("../routes/contact/contactRoute");
const countryRouter = require("../routes/country/country");
const stateRouter = require("../routes/country/state");
const categoryRouter = require("../routes/product/categoryRoute");
const orderStatusRouter = require("../routes/order/orderStatusRoute");
const orderUserRouter = require("../routes/order/orderUserRoute");
const adminRoute = require("../routes/auth/adminRoute");
const blogRouter = require("../routes/blog/blogRouter");
const adminDashAnalysisRouter = require("../routes/admin-dashboard-analysis/adminDashAnalysisRoute");


// cors options
const whitelist = ["https://ecommerce-api-green.vercel.app"];
var corsOptions = {
  origin : function (origin,callback){
    if(origin && whitelist.indexOf(origin) !== -1){
      callback(null,true);
    }else{
      callback(console.log(new Error("Not allowed by CORS")));
    }
  },
  Credential:true
}



const app = express();


//Middlewares
app.use(express.json()); //pass incoming json data
app.use(express.urlencoded({extended:false})); // upload image


//cors all routes
app.use(cors({
  origin:"*",
}));

app.options('*', cors())


//Routes
app.use("/api/v1/userAuth", userRouter); 
app.use("/api/v1/adminAuth",adminRoute); 
app.use("/api/v1/product",productRouter); 
app.use("/api/v1/order",orderRouter);
app.use("/api/v1/orderStatus",orderStatusRouter);
app.use("/api/v1/user",orderUserRouter);
app.use("/api/v1/bestSeller",productRouter);
app.use("/api/v1/review",reviewRouter);
app.use("/api/v1/contact",contactRouter);
app.use("/api/v1/country",countryRouter);
app.use("/api/v1/state",stateRouter);
app.use("/api/v1/category",categoryRouter);
app.use("/api/v1/blog", blogRouter)
app.use("/api/v1/adminDashboardAnalysis", adminDashAnalysisRouter); 

const path = require("path")
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname + '/index.html'))
})

// static category url
app.use('/category',express.static(path.join(__dirname,'../public/category')))

//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app; 
