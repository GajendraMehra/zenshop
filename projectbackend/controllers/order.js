const {
    Order
} = require("../models/order")

exports.updateOrderStatus = (req, res, next) => {
    Order.update({
            _id: req.body.orderId
        }, {
            $set: {
                status: req.body.status
            }
        },
        (err, order) => {
            if (err) {
                return res.json(err)
            }
            return res.json(order)

        })
}
exports.getOrderStatus = (req, res, next) => {
    res.json(Order.schema.path("status").enumValues)
}

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id).exec((err, order) => {
        if (err || !order) {
            return res.status(400).json({
                error: "Error",
                errMsg: errMsg
            })
        }

        req.order = order
    })
}

exports.getOrder = (req, res) => {
    return res.json(req.order)
}
exports.getAllOrders = (req, res) => {
    Order.find().populate("user", "_id name").exec((err, orders) => {
        if (err || !orders) {
            return res.status(400).json({
                error: "error",
                errMsg: err
            })
        }
        return res.json({
            orders
        })
    })
}


exports.createOrder = (req, res) => {

    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save((err, order) => {
        if (err || !order) {
            return res.status(400).json({
                error: "Error",
                errMsg: err
            })
        }
        return res.json(order)
    })
}