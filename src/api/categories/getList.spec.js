require('dotenv').config()
const supertest = require('supertest')

it('gets the categories list', async () => {
    const response = await supertest(process.env.TEST_URL).get('/categories')
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                iconcolor: expect.any(String),
                iconurl: expect.any(String),
                name: expect.any(String)
            })
        ])
    )
    return true
})