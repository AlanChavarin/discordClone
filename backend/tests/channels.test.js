const app = require('../app')
const {connect, seedDatabase, clearDatabase, closeDatabase} = require('../dbHandler')
const request = require('supertest')

beforeAll(async () => await connect())

beforeEach(async () => {
    jest.resetModules()
    process.env.JWT_SECRET = 'UWERTMCMY789ST579HMSECRGHUMISDCRTGNJKDCFVGNJZSDFNLNJ;XDFVKLNJXDFVKLNJSDRFHJKL;DRFGSKHUSDFQWERTYUSDVJXB'
    await seedDatabase()
})

afterEach(async () => await clearDatabase())

afterAll(async () => await closeDatabase())

describe('tests channels', () => {
    test('does getting a specific channel work?', () => {
        const response = request(app)
        .get('/api/channels/64e41dcf28f64143d62ef712')

        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body).toMatchObject({
            '_id': '64e41dcf28f64143d62ef712',
            'name': expect.anything(),
        })

    })

    test('does getting channels work?', () => {
        const response = request(app)
        .get('/api/channels/')

        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        response.body.forEach(channel => {
            expect(channel).toMatchObject({
                '_id': '64e41dcf28f64143d62ef712',
                'name': expect.anything(),
            })
        })

    })
})
