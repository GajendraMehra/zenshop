var express = require('express');

var router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');
const {
    signout,
    signup,
    signin,
    isSignedIn
} = require("../controllers/auth")

router.get("/signout", signout)


router.post("/signup", [
    // username must be an email
    check("email", "invalid Email").isEmail(),
    check("name", "Must be  5 char long").isLength({
        min: 5
    }),
    // password must be at least 5 chars long
    check('password', "Password must be minimum 5 character").isLength({
        min: 5
    })
], signup)

// sign in route 
router.post("/signin", [
    // username must be an email
    check("email", "invalid Email").isEmail(),
    // password must be at least 5 chars long
    check('password', "Password is required").isLength({
        min: 1
    })
], signin)


module.exports = router