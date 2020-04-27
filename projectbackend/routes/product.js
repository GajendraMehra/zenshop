const express = require("express")
const router = express.Router();

const {
    getAllProduct,
    getProductByCatId,
    getProductById,
    removeProduct,
    updateProduct,
    getProduct,
    addProduct,
    getPhoto
} = require("../controllers/product")
const {
    isSignedIn,
    isAdmin,
    isAuthenticated
} = require("../controllers/auth")

const {
    getUserById
} = require("../controllers/user")


router.param("userId", getUserById)
router.param("productId", getProductById)
router.param("categoryId", isSignedIn, isAdmin, isAuthenticated, getProductByCatId)


router.post("/product/create/:userId", isSignedIn, isAdmin, isAuthenticated, addProduct)
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", getPhoto)


module.exports = router