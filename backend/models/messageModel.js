const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Message', messageSchema)