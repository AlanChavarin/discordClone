const request = require('supertest')
const app = require('../app')
const {connect, seedDatabase, clearDatabase, closeDatabase} = require('../dbHandler')

beforeAll(async () => await connect())

beforeEach(async () => {
    jest.resetModules()
    process.env.JWT_SECRET = 'UWERTMCMY789ST579HMSECRGHUMISDCRTGNJKDCFVGNJZSDFNLNJ;XDFVKLNJXDFVKLNJSDRFHJKL;DRFGSKHUSDFQWERTYUSDVJXB'
    await seedDatabase()
})

afterEach(async () => await clearDatabase())

afterAll(async () => await closeDatabase())

describe('tests users', () => {
    test('Does creating a new user work?', async () => {
        const response = await request(app)
        .post('/api/users/')
        .send({
            username: 'Greg',
            password: 'hello123',
        })

        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body).toMatchObject({
            username: 'Greg',
            token: expect.anything()
        })

        //we do not want the password being returned
        Object.values(response.body).forEach(value => {
            expect(value !== 'hello123').toBe(true)
        })
    })

    test('Does requesting a specific user work? (expects fixtures to be loaded)', async () => {
        const response = await request(app)
        .get('/api/users/64e291054df05085bb55ee72')

        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body).toMatchObject({
            _id: '64e291054df05085bb55ee72',
            username: expect.anything()
        })

        //we do not want the password being returned
        Object.keys(response.body).forEach(key => {
            expect(key !== 'password').toBe(true)
        })
    })

    test('Does requesting all users work? (expects fixtures to be loaded)', async () => {
        const response = await request(app)
        .get('/api/users/')

        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        response.body.forEach(user => {
            expect(user).toMatchObject({
                _id: expect.anything(),
                username: expect.anything()
            })

            //we do not want the password being returned
            Object.keys(user).forEach(key => {
                expect(key !== 'password').toBe(true)
            })
        })
    })

    test('Does logging in as a user work?', async () => {
        const response = await request(app)
        .post('/api/users/login')
        .send({
            username: 'Obama',
            password: 'hunter12'
        })

        console.log(response.body)

        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body).toMatchObject({
            token: expect.anything()
        })
    })
    
})