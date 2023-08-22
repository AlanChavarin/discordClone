const app = require('app')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

app.use(cors({
    origin: 'http://localhost:3000',
    origin: 'http://localhost:5000'
}))

app.listen(process.env.PORT, () => {
    console.log('App connected on ' + process.env.PORT)
    console.log('App started in ' + process.env.NODE_ENV + ' mode')
})

mongoose.connect(process.env.MONGO_URI)

app.use(express.static('frontend/index.html'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve('frontend', 'index.html'))
})