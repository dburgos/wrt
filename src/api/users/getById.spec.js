require('dotenv').config()
const supertest = require('supertest')

const TEST_ID = 'e30442f9-ac00-4f99-ad8f-cc495a71b16b'

it('gets the book list', async () => {
    const response = await supertest(process.env.TEST_URL).get(`/users/${TEST_ID}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
        expect.objectContaining({
            id: expect.any(String),
            gender: expect.any(String),
            age: expect.any(String),
            createdat: expect.any(String),
            updatedat: expect.any(String)
        })
    )
    return true
})

it('requires id param when not provided', async () => {
    const response = await supertest(process.env.TEST_URL).get(`/users/`)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('ID param must be provided');
    return true
})