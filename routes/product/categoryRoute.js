const express = require("express");
const categoryRouter = express.Router();
// const multer = require("multer")

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       return cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       // return cb(null, file.fieldname + '-' + uniqueSuffix)
//       return cb(null,`${Date.now()}-${file.originalname}`);
//     }
//   })
  
//   // const upload = multer({ dest: "uploads/" })
//   const upload = multer({storage})

const { getProductCategory, createProductCategory, deleteProductCategory, updateProductCategory } = require("../../controller/products/categoryCtrl");
const upload = require("../../middlewares/upload");
const isAuthenticatedAdmin = require("../../middlewares/isAuthenticatedAdmin");
const Admins = require("../../model/auth/Admin");

categoryRouter.get('/',getProductCategory)
categoryRouter.post('/',isAuthenticatedAdmin(Admins),
// upload.single("category_file"),
 createProductCategory)

categoryRouter.route('/:id').delete(deleteProductCategory).put(updateProductCategory)

module.exports = categoryRouter;    