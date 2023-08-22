const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const Fixture = require('node-mongodb-fixtures')

let mongod, uri

const fixtureHandler = new Fixture({
    dir: 'backend/fixtures',
    mute: true
})

const connect = async () => {
    mongod = await MongoMemoryServer.create()
    uri = mongod.getUri()

    const mongooseOptions = {
        useNewUrlParser: true
    }

    await mongoose.connect(uri, mongooseOptions)
    await fixtureHandler.connect(uri)
}

const seedDatabase = async () => {
    await fixtureHandler.load()
}

const clearDatabase = async () => {
    await mongoose.connection.dropDatabase()
}

const closeDatabase = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await fixtureHandler.disconnect()
    await mongod.stop()
}

module.exports = {
    connect,
    seedDatabase,
    clearDatabase,
    closeDatabase,
}