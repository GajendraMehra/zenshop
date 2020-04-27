const express = require("express")
const router = express.Router();

const {
    getAllProduct,
    getProductByCatId,
    getProductById,
    removeProduct,
    updateProduct,
    getProduct
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
router.param("productId", isSignedIn, isAdmin, isAuthenticated, getProductById)
router.param("categoryId", isSignedIn, isAdmin, isAuthenticated, getProductByCatId)





module.exports = router