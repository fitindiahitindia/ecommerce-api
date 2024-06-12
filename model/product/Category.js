const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
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
;
const Category = mongoose.model("Category",categorySchema);

module.exports = Category;