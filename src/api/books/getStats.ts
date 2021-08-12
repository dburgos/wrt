import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import getStats from "../../services/books/getStats"

export const method = 'GET'
export const url = '/books/:id/stats'

export async function handler(fastify: FastifyInstance, req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const {
        id
    } = req.params as any
    if (!id) {
        return reply.code(401).send({ message: 'ID param must be provided' })
    }
    const db = (fastify as any).pg
    const out:object = await getStats(db, id)
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