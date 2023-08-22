const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const dotenv = require('dotenv').config()

const authenticate = asyncHandler(async (req, res, next) => {
    if(req.headers?.authorization && req.headers?.authorization.startsWith('Bearer')){
        try{
            const token = req.headers.authorization.split(' ')[1]
            const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decodedUser.id)
            if(!req.user){
                res.status(400)
                throw new Error('User not found')
            }
            next()
        } catch (error) {
            console.log(error)
            res.status(400)
            throw new Error('not authorized')
        }
    } else {
        res.status(400)
        throw new Error('Authorization error, no token found')
    }
})

module.exports = {
    authenticate
}