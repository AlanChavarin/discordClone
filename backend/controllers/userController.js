const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createUser = asyncHandler(async (req, res) => {
    if(!req.body.password || req.body.password < 7){
        res.status(400)
        throw new Error('password must be at least 7 characters long')
    }

    if(!req.body.username){
        res.status(400)
        throw new Error('no username provided')
    }

    if(await User.findOne({username: req.body.name})){
        res.status(400)
        throw new Error('username already taken')
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const user = await User.create({
        username: req.body.username,
        password: hashedPassword,
    })

    const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET)

    res.status(200)
    res.json({
        token: token,
        username: user.username
    })
})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userid)

    if(!user){
        res.status(400)
        throw new Error('user not found')
    }

    res.status(200)
    res.json({
        _id: user._id,
        username: user.username,
    })
})

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}, {password: 0})

    res.status(200)
    res.json(users)
})

const login = asyncHandler(async (req, res) => {
    if(!req.body.username){
        res.status(400)
        throw new Error('username not included')
    }
    if(!req.body.password){
        res.status(400)
        throw new Error('password not included')
    }

    const userThatsLoggingIn = await User.findOne({username: req.body.username})

    if(!userThatsLoggingIn){
        res.status(400)
        throw new Error('user with that username not found')
    }

    if(userThatsLoggingIn && (await bcrypt.compare(req.body.password, userThatsLoggingIn.password))){
        res.status(200)
        res.json({
            token: await jwt.sign({id: userThatsLoggingIn._id}, process.env.JWT_SECRET)
        })
    } else {
        res.status(400)
        throw new Error('password or username incorrect')
    }
})

module.exports = {
    createUser,
    getUser,
    getUsers,
    login
}