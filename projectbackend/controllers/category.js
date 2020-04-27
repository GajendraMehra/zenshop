const Category = require("../models/category")
const {
    check,
    validationResult
} = require("express-validator");
exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Category not found"
            })
        }
        req.category = category
        next()
    })
}

exports.saveCategory = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    const category = new Category(req.body)
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Category not saved",
                errorMessage: err.errmsg
            })
        }
        return res.json({
            category: category
        })
    })
}

exports.getAllCategories = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Category not saved",
                errorMessage: err.errmsg
            })
        }
        return res.json({
            categoriess: categories
        })
    })


}
exports.getCategory = (req, res) => {
    return res.json(req.category)
}


exports.updateCategory = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    const category = req.category
    category.name = req.body.name
    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Error while update",
                errorMessage: err.errmsg
            })
        }
        return res.json(updatedCategory)
    })


}


exports.removeCategory = (req, res) => {
    const category = req.category
    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Some error occurs",
                errorMessage: err.errmsg
            })
        }
        return res.status(200).json({
            message: "Succesfully deleted",
            category: category
        })
    })
}