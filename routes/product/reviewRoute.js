const express = require('express');
const { createProductReview, getProductReview } = require('../../controller/products/productReviewCtrl');
const reviewRouter = express.Router();

reviewRouter.route("/").post(createProductReview)
reviewRouter.route("/").get(getProductReview)

module.exports =reviewRouter;