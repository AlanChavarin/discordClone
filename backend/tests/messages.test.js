const request = require('supertest')
const app = require('../app')
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

describe('tests messages (requires fixtures to work)', () => {
    test('Does posting a message work correctly?', async () => {
       const response = await request(app)
       .post('/api/messages')
       .set({
            //sending message as user Obama
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTI5MTA1NGRmMDUwODViYjU1ZWU3MiIsImlhdCI6MTY5MjYwNjE5NH0.aOHHi1By73u901P4f9NQ6M_-U9yYNIQLx5ee3HfGTpc'
       })
       .send({
            message: 'Hello world!',
       })

       expect(response.status).toBe(200)
       expect(response.type).toBe('application/json')
       expect(response.body).toMatchObject({
            _id: expect.anything(),
            message: 'Hello world!',
            userId: '64e291054df05085bb55ee72',
            username: 'Obama',
            createdAt: expect.anything(),
       })
    })

    test('Does requesting a specific message work (assumes message was loaded through fixtures)', async () => {
        const response = await request(app)
        .get('/api/messages/64e1988f48230a00fcc62cdb')

        expect(response.status).toBe(200)
        expect(response.body).toMatchObject({
            _id: "64e1988f48230a00fcc62cdb",
            message: expect.anything(),
            userId: expect.anything(),
            username: expect.anything(),
            createdAt: expect.anything()
        })
    })

    test('Does requesting all messages work in the correct order', async () => {
        const response = await request(app)
        .get('/api/messages/')

        expect(response.status).toBe(200)

        //checks that every message has the expected fields
        response.body.forEach(message => {
            expect(message).toEqual(
                expect.objectContaining({
                    _id: expect.anything(),
                    message: expect.anything(),
                    userId: expect.anything(),
                    username: expect.anything(),
                    createdAt: expect.anything(),
                })
            )
        })

        //checks that the descending order of the messages is correct
        for(let i = 0; i < response.body.length-1; i++){
            expect(response.body[i].createdAt >= response.body[i+1].createdAt).toBe(true)
        }

    })


    
})