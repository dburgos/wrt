import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import countUniqueReadClients from "../../services/books/countUniqueReadClients"
import countUniqueReadUsers from "../../services/books/countUniqueReadUsers"
import countClientsByCountry from "../../services/books/countClientsByCountry"

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
    const [
        uniqueClients, uniqueUsers, clientsByCountry
    ] = await Promise.all([
        countUniqueReadClients(db, id),
        countUniqueReadUsers(db, id),
        countClientsByCountry(db, id)
    ])
    const out = {
        uniqueClients,
        uniqueUsers,
        clientsByCountry
    }
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