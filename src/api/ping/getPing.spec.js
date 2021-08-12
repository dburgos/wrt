require('dotenv').config()
const supertest = require('supertest')

it('get ping endpoint', async () => {
    const response = await supertest(process.env.TEST_URL).get('/ping')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(true)
    return true
})