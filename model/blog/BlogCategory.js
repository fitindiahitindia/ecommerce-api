const mongoose = require("mongoose");

const BlogCategorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
    }
},
{timestamps:true},
)

const BlogCategory = mongoose.model("BlogCategory",BlogCategorySchema);

module.exports = BlogCategory;