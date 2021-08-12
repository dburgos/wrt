# wr challenge
This repo uses typescript, fastify as framework, postgresql as db and jest+supertest for testing

## Getting started

1 - Install dependencies running the command

```bash
npm i
```

2 - Create `.env` file (feel free to start from `.env.example`) and set the values

3 - Run server, first build `npm build` and then `npm start`

For dev, keep running `npm run ts` (typescript with watch) and `npm run dev` to run server with nodemon

## Endpoints

| Method | Path | Description | URL param(s) | Query param(s) |
|---|---|---|---|---|
| GET | /categories | List all the categories | x | x |
| GET | /books | List all books | x | `next` = (string: last id), `size` = (number: total page size) |
| GET | /books/:bookId/stats | Get stats of a book  | `bookId`: string | x |
| GET | /users/:userId | Get a user data  | `userId`: string | x |
| GET | /users | Get a user list  | x | `next` = (string: last id), `size` = (number: total page size), `minAge` (number: filter minimum age), `maxAge` (number: filter maximum age), `maxAge` (number: filter gender), `sortBy` (string: sorts using one of the next field [`'createdat'`, `'updatedat'`]) |


## Tests

Run `npm t`

```bash
 PASS  src/api/ping/getPing.spec.js
 PASS  build/api/ping/getPing.spec.js
 PASS  src/api/categories/getList.spec.js
 PASS  build/api/categories/getList.spec.js
 PASS  build/api/users/getById.spec.js
 PASS  src/api/users/getById.spec.js
 PASS  src/api/users/getList.spec.js
 PASS  build/api/users/getList.spec.js
 PASS  build/api/books/getList.spec.js
 PASS  src/api/books/getList.spec.js
 PASS  build/api/books/getStats.spec.js (44.879 s)
 PASS  src/api/books/getStats.spec.js (44.853 s)

Test Suites: 12 passed, 12 total
Tests:       26 passed, 26 total
Snapshots:   0 total
Time:        45.173 s, estimated 46 s
Ran all test suites.
```