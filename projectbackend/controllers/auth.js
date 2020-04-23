const signout = (req, res) => {
    res.json("user signout")
}

const signup = (req, res) => {
    res.json({
        "message": "user signup router"
    })
}



module.exports.signout = signout
module.exports.signup = signup