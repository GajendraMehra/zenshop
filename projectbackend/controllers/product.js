const Product = require("../models/product")

exports.addProduct = (req, res) => {


}
exports.removeProduct = (req, res) => {

}

exports.updateProduct = (req, res) => {

}
exports.getAllProduct = (req, res) => {

}

exports.getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product)) {
        if (err || !product) {
            return res.status(400).json({
                error: "Product Not found",
                errMsg: err
            })
            req.product = product
            next();
        }
    }

}

exports.getProductByCatId = (req, res) => {

}

exports.getProduct = (req, res) => {

}