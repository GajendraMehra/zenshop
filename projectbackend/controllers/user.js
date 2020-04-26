const User = require("../models/user")


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