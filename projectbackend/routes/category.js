const express = require("express")
const router = express.Router();
const {
    getCategoryById,
    saveCategory,
    getCategory,
    getAllCategories,
    updateCategory,
    removeCategory
} = require("../controllers/category")
const {
    isSignedIn,
    isAdmin,
    isAuthenticated
} = require("../controllers/auth")
const {
    getUserById
} = require("../controllers/user")
const {
    check,
    validationResult
} = require('express-validator');
router.param("userId", getUserById)
router.param("categoryId", getCategoryById)


// routes
router.post("/category/create/:userId", [
    check("name", "Name Required").isLength({
        min: 1
    })
], isSignedIn, isAuthenticated, isAdmin, saveCategory)
router.get("/categories/:categoryId", getCategory)
router.get("/categories", getAllCategories)


router.put("/categories/:categoryId/:userId",   updateCategory)
router.delete("/categories/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory)
module.exports = router