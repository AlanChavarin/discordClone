const express = require('express')
const router = express.Router()
const {getMessages, getMessage, postMessage} = require('../controllers/messageController')
const {authenticate} = require('../middleware/authMiddleware')


router.get('/', getMessages)

router.get('/:messageid', getMessage)

router.post('/', authenticate, postMessage)

module.exports = router