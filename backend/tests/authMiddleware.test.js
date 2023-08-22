const {authenticate} = require('../middleware/authMiddleware')
const {connect, seedDatabase, clearDatabase, closeDatabase} = require('../dbHandler')
const ObjectId = require('mongodb').ObjectId

beforeAll(async () => await connect())

beforeEach(async () => {
    jest.resetModules()
    process.env.JWT_SECRET = 'UWERTMCMY789ST579HMSECRGHUMISDCRTGNJKDCFVGNJZSDFNLNJ;XDFVKLNJXDFVKLNJSDRFHJKL;DRFGSKHUSDFQWERTYUSDVJXB'
    await seedDatabase()
})

afterEach(async () => await clearDatabase())

afterAll(async () => await closeDatabase())


describe('Authentication Middleware for users (requires fixtures)', () => {
    test('Does the authentication function properly put user data to req.user given the correct token', async () => {
        //this is user Obama's token
        const req = {
            headers: {
                authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTI5MTA1NGRmMDUwODViYjU1ZWU3MiIsImlhdCI6MTY5MjYwNjE5NH0.aOHHi1By73u901P4f9NQ6M_-U9yYNIQLx5ee3HfGTpc'
            }
        }

        const res = {
            status: jest.fn(x => x),
        }

        const next = jest.fn()


        await authenticate(req, res, next)

        expect(res.status).not.toHaveBeenCalledWith(400)
        
        expect(next).toHaveBeenCalledTimes(1)

        expect(req.user).toMatchObject({
            "_id": new ObjectId('64e291054df05085bb55ee72'),
            "username": 'Obama',
            "password": '$2a$10$0rfVMu0t4uuDPmVSdq9Vxe/550S8Wbihc2L2kz4tGInZvEn0x3P6a',
        })
    })

    test('given malformed token, is status(400) called?', async () => {
        const req = {
            headers: {
                authorization: 'erpyouiedrftiohuyjioeprtyjuhiopftgjyninopdjthiopdrtmyrtjop[erstoyiuiodrthjoifjgh'
            }
        }
        const res = {
            status: jest.fn(x => x)
        }
        const next = jest.fn()

        await authenticate(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)

        expect(next).toHaveBeenCalledTimes(1)

        expect(req.user).toBeUndefined()

    }) 

    test('Given no token, is status(400) called?', async () => {
        const req = {
            
        }
        const res = {
            status: jest.fn(x => x)
        }
        const next = jest.fn()

        await authenticate(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)

        expect(next).toHaveBeenCalledTimes(1)

        expect(req.user).toBeUndefined()
    })
})