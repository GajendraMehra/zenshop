const mongoose = require("mongoose");
const {
    ObjectId
} = mongoose.Schema;

const productCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
})

const OrderSchema = mongoose.Schema({
    products: [productCartSchema],
    transaction_id: {},
    amount: {
        type: Number
    },
    address: {
        type: String
    },
    status: {
        type: String,
        default: "Received",
        enum: ["Cancelled", "Delivered", "Shipped", "Received", "Processing"]
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }

}, {
    timestamps: true
})

const Order = mongoose.model("Order", OrderSchema)
const ProductCart = mongoose.model("ProductCart", productCartSchema)

module.exports = {
    Order,
    ProductCart
}