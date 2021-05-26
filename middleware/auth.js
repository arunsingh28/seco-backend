const DB = require('../models')
const _user = DB.user;
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return res.json({ status: 'error', error: 'Not Authorize to perform this action' })
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        const user = await _user.findOne({
            where:
            {
                email: decoded.id
            }
        })

        if (!user) {
            return res.json({ status: 'error', error: 'No user found' })
        }
        const newUser = {
            fullName: user.fullName,
            email: user.email,
            id: user.id
        }
        req.user = newUser
        next()
    } catch (error) {
        return res.json({ status: 'error', error: 'Not Authorize to perform this action' })
    }
}