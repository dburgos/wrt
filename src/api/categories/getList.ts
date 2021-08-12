import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import getList from "../../services/categories/getList"

export const method = 'GET'
export const url = '/categories'

export async function handler(fastify: FastifyInstance, req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const db = (fastify as any).pg
    const out:Object[] = await getList(db)
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