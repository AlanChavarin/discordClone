const express = require('express')
const app = express()
const errorHandler = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/messages', require('./routes/messageRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

module.exports = app