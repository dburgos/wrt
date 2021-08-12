require('dotenv').config()
const supertest = require('supertest')

it('gets the book list', async () => {
    const response = await supertest(process.env.TEST_URL).get('/books')
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                uuid: expect.any(String),
                title: expect.any(String),
                author: expect.any(String),
                language: expect.any(String),
                id: expect.any(Number)
            })
        ])
    )
    return true
})

it('gets the page size as requested', async () => {
    const SIZE = 5;
    const response = await supertest(process.env.TEST_URL).get(`/books?size=${SIZE}`)
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.length).toBe(SIZE);
    expect(response.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                uuid: expect.any(String),
                title: expect.any(String),
                author: expect.any(String),
                language: expect.any(String),
                id: expect.any(Number)
            })
        ])
    )
    return true
})