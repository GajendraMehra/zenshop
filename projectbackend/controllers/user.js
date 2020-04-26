const User = require("../models/user")
const {
    Order
} = require("../models/order")


exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user found"
            })
        }
        req.profile = user
        next()
    })

}



exports.getUser = (req, res, next) => {
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = req.profile.updatedAt = undefined
    return res.json(req.profile)
}


exports.updateUser = (req, res, next) => {
    User.findByIdAndUpdate({
            _id: req.profile._id
        }, {
            $set: req.body
        }, {
            new: true,
            userFindAndModify: false
        },
        (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "No user found"
                })
            }
            user.salt = undefined
            user.encry_password = undefined
            user.createdAt = user.updatedAt = undefined
            return res.status(200).json({
                message: "Updated",
                user: user
            })
        })

}

exports.userPurchaseList = (req, res) => {

    console.log(Order);

    Order.find({
        user: req.profile._id
    }).populate("user", "_id name").exec((err, order) => {
        if (err || !order) {
            return res.status(400).json({
                error: "No order found"
            })
        }
        return res.status(200).json({
            message: "Order",
            orders: order
        })
    })
}

exports.updatePurhaseList = (req, res) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product.id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            tramsactionId: req.body.order.tramsactionId
        })

        User.findOneAndUpdate({
            _id: req.profile._id
        }, {
            $push: {
                purchases: purchases
            }
        }, {
            new: true
        }, (err, purchase) => {
            if (err || !purchase) {
                res.status(400).json({
                    error: "Unable to save."
                })
            }
            res.status(200).json({
                purchases: purchase
            })
            next()
        })
    });
}