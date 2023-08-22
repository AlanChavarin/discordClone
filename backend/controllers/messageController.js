const asyncHandler = require('express-async-handler')
const Message = require('../models/messageModel')

const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find().sort({createdAt: -1})

    res.status(200)
    res.json(messages)
})

const getMessage = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.messageid)

    if(!message){
        res.status(400)
        throw new Error('Message not found')
    }

    res.status(200)
    res.json(message)
})

const postMessage = asyncHandler(async (req, res) => {
    console.log(req.user._id)
    const message = await Message.create({
        userId: req.user._id,
        username: req.user.username,
        message: req.body.message
    })

    res.status(200)
    res.json(message)
})

module.exports = {
    getMessages,
    getMessage,
    postMessage
}