import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import getList from "../../services/books/getList"

export const method = 'GET'
export const url = '/books'

export async function handler(fastify: FastifyInstance, req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const db = (fastify as any).pg
    const {
        next = 1,
        size = 10
    } = req.query as any
    const out: Object[] = await getList(db, next, size);
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