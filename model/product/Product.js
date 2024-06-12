    const mongoose = require("mongoose");

    const productSchema = new mongoose.Schema({
        pId: {
            type: String,
            required: true,
            default: function () {
                return (
                    "PRO" +
                    Math.floor(100 + Math.random() * 999999)
                )
            }
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        oldPrice: {
            type: Number,
            required: true
        },
        admin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Admin",
         },
    }, {
        timestamps: true,
    }, );

    //model
    const Product = mongoose.model("Product", productSchema);


    module.exports = Product;