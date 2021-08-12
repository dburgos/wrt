require('dotenv').config()
jest.setTimeout(50000)

const supertest = require('supertest')

const TEST_ID = '8c1ac240-b509-4a15-a291-cc559ee56698'

it('gets the book stats', async () => {
    const response = await supertest(process.env.TEST_URL).get(`/books/${TEST_ID}/stats`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
        expect.objectContaining({
            uniqueClients: expect.any(Number),
            uniqueUsers: expect.any(Number),
            clientsByCountry: expect.any(Array)
        })
    )
    return true
})

it('requires id param when not provided', async () => {
    const response = await supertest(process.env.TEST_URL).get(`/books//stats`)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('ID param must be provided');
    return true
})