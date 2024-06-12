const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    blogId: {
        type: String,
        required: true,
        default: function () {
            return (
                "BLG" +
                Math.floor(100 + Math.random() * 999999)
            )
        }
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdBlogDate:{
        type:Date,
        default:Date.now
    }
}, {
    timestamps: true,
}, );

//model
const Blog = mongoose.model("Blog", blogSchema);


module.exports = Blog;