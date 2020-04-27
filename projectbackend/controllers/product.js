const Product = require("../models/product")
const foridable = require("formidable");
const fs = require("fs")
exports.addProduct = (req, res) => {
    let form = new foridable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Not abe to save",
                errMsg: err
            })
        }



        let product = new Product(fields)
        // destructure the fields 

        let {
            name,
            description,
            category,
            stock,
            price
        } = fields
        if (!name || !price || !description || !category || !stock) {

            return res.status(400).json({
                "error": "Some fields are missing"
            })

        }
        // handle file here
        if (file.photo) {
            if (file.photo.size > 2097152) {
                return res.status(400).json({
                    err: "File too big to handle ",

                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed",
                    errMsg: err
                })
            }
            product.photo = undefined
            return res.json({
                product: product
            })
        })
    })

}
exports.removeProduct = (req, res) => {
    let product = req.product;
    product.remove((err, product) => {

        if (err || !product) {
            return res.status(400).json({
                error: "Products Not found",
                errMsg: err
            })

        }
        req.product.photo = undefined
        return res.json({
            "message": "Product Deleted",
            product: product
        })
    })
}

exports.updateProduct = (req, res) => {

}
exports.getAllProduct = (req, res) => {
    Product.find().exec((err, product) => {


        if (err || !product) {
            return res.status(400).json({
                error: "Products Not found",
                errMsg: err
            })

        }
        return res.json({

        })
    })
}

exports.getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {


        if (err || !product) {
            return res.status(400).json({
                error: "Product Not found",
                errMsg: err
            })

        }
        req.product = product
        // req.product.photo = undefined
        next()
    })

}

exports.getProductByCatId = (req, res) => {

}

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json({
        produdct: req.product
    })
}
exports.getPhoto = (req, res, next) => {
    // console.log(req.product);

    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}