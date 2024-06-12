var multer  =   require('multer');  

// const upload = multer({
//     storage:multer.diskStorage({
//         destination:function(req,file,cb)
//         {
//            return cb(null,"./uploads")
//         },
//         filename:function(req,file,cb)
//         {
//            return cb(null,file.filename+"-"+Date.now()+".jpg")
//         }
//     }).single("category_file")
// })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      // return cb(null, file.fieldname + '-' + uniqueSuffix)
      return cb(null,`${Date.now()}-${file.originalname}`);
    }
  })
  const upload = multer({storage})
module.exports = upload;