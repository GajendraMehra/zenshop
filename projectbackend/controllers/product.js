const Product = require("../models/product")
const Category = require("../models/category")
const foridable = require("formidable");
const fs = require("fs")
const _ = require("lodash")
exports.addProduct = (req, res) => {
    let form = new foridable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save",
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


    let form = new foridable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Not abe to save",
                errMsg: err
            })
        }



        let product = req.product;
        console.log(fields);
        console.log(product);

        product = _.extend(product, fields)
        // destructure the fields 
        console.log(product);

        let {
            name,
            description,
            category,
            stock,
            price
        } = fields

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

exports.getAllProduct = (req, res) => {
    console.log(req.query);

    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? (req.query.sortBy) : "_id"
    let sortType = req.query.sortType ? parseInt(req.query.sortType) : 1

    Product.find().select("-photo ").sort({
        sortBy: sortType
    }).limit(limit).exec((err, product) => {


        if (err || !product) {
            return res.status(400).json({
                error: "Products Not found",
                errMsg: err
            })

        }

        return res.json({
            products: product
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

exports.getAllCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "No caegory found "
            })
        }
        return res.json(category)
    })
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


exports.updateStock = (req, res, next) => {
    let myOperation = req.body.order.product.map(prod => {
        return {
            updateOne: {
                filter: {
                    _id: prod._id
                },
                update: {
                    $include: {
                        stock: -prod.count,
                        sold: +prod.count
                    }
                }
            }
        }
    })

    Product.bulkWrite(myOperation, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk operation failed"
            })
        }

    })
    next()
}