const express = require("express")
// const User = require("../models/user");
const router = express.Router();
const {
    getUserById,
    userPurchaseList
} = require("../controllers/user")
const {
    isSignedIn,
    isAdmin,
    isAuthenticated
} = require("../controllers/auth")
const {
    getOrderById,
    getOrder,
    createOrder,
    getAllOrders,
    updateOrderStatus,
    getOrderStatus
} = require("../controllers/order")

const {
    updateStock
} = require("../controllers/product")


router.param("orderId", getOrderById)
router.param("userId", getUserById)

router.get("/order/:orderId", getOrder)
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)

router.post("/order/new/:userId", isSignedIn, isAuthenticated, userPurchaseList, updateStock, createOrder)

router.get("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateOrderStatus)
module.exports = router