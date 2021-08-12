import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import getList from "../../services/users/getList"

export const method = 'GET'
export const url = '/users'

const ALLOW_SORT_BY = ['createdat', 'updatedat']

export async function handler(fastify: FastifyInstance, req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const db = (fastify as any).pg
    const {
        next,
        size,
        gender,
        minAge,
        maxAge,
        sortBy
    } = req.query as any
    const filterInvalidSorting = sortBy && !ALLOW_SORT_BY.includes(sortBy)
    if (filterInvalidSorting) {
        return reply.code(401).send({ message: `Sorting by ${sortBy} field is not available`})
    }
    const out: Object[] = await getList(db, next, size, gender, minAge, maxAge, sortBy);
    return reply.code(200).send(out)
}

export default function (fastify: FastifyInstance) {
    fastify.route({
        method,
        url,
        handler: (req, res) => {
            return handler(fastify, req, res)
        }
    })
}