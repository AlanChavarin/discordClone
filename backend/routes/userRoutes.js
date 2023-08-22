const express = require('express')
const router = express.Router()
const {createUser, getUser, getUsers, login} = require('../controllers/userController')

router.post('/', createUser)

router.get('/:userid', getUser)

router.get('/', getUsers)

router.post('/login', login)

module.exports = router