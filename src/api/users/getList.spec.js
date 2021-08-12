require('dotenv').config()
const supertest = require('supertest')

const WRONG_SORTBY_FIELD = 'whatever'

it('gets the users list', async () => {
    const response = await supertest(process.env.TEST_URL).get('/users')
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(String),
                gender: expect.any(String),
                age: expect.any(String),
                createdat: expect.any(String),
                updatedat: expect.any(String)
            }),
        ])
    )
    return true
})

it('validates an invalid sortBy field', async () => {
    const response = await supertest(process.env.TEST_URL).get(`/users?sortBy=${WRONG_SORTBY_FIELD}`)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe(`Sorting by ${WRONG_SORTBY_FIELD} field is not available`);
    return true
})

it('filters by minAge', async () => {
    const AGE = 54;
    const response = await supertest(process.env.TEST_URL).get(`/users?minAge=${AGE}`)
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0);
    expect(parseInt(response.body[0].age)).toBeGreaterThanOrEqual(AGE);
    expect(response.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(String),
                gender: expect.any(String),
                age: expect.any(String),
                createdat: expect.any(String),
                updatedat: expect.any(String)
            }),
        ])
    )
    return true
})

it('filters by maxAge', async () => {
    const AGE = 50;
    const response = await supertest(process.env.TEST_URL).get(`/users?maxAge=${AGE}`)
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0);
    expect(parseInt(response.body[0].age)).toBeLessThanOrEqual(AGE);
    expect(response.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(String),
                gender: expect.any(String),
                age: expect.any(String),
                createdat: expect.any(String),
                updatedat: expect.any(String)
            }),
        ])
    )
    return true
})

it('filters by gender', async () => {
    const GENDER = 1;
    const response = await supertest(process.env.TEST_URL).get(`/users?gender=${GENDER}`)
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0);
    expect(parseInt(response.body[0].gender)).toBe(GENDER);
    expect(response.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(String),
                gender: expect.any(String),
                age: expect.any(String),
                createdat: expect.any(String),
                updatedat: expect.any(String)
            }),
        ])
    )
    return true
})