const express = require('express');
const productRouter = express.Router();
const{
    getProduct,
    createProduct,
    deleteProduct,
    getProductById,
    updateProductById,
    getProductCategory,
} = require('../../controller/products/getProductsCtrl');
const isAuthenticatedAdmin = require('../../middlewares/isAuthenticatedAdmin');
const Admins = require('../../model/auth/Admin');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const roleRestrication = require('../../middlewares/roleRestriction');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');

productRouter.get('/', getProduct);
productRouter.get('/:id',getProductById);

productRouter.post('/',isAuthenticatedAdmin(Admins),createProduct);
productRouter.delete('/:id',deleteProduct);
productRouter.put('/:id',updateProductById);

module.exports = productRouter;