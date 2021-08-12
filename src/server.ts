import { fastify as Fastify } from 'fastify'
import endpoints from './api/index'

const isProduction = process.env.NODE_ENV == 'production'
const fastify = Fastify({
    logger: { prettyPrint: !isProduction },
    trustProxy: true
})

const start = async () => {
    try {
        await fastify.register(require('fastify-env'), { confKey: 'ENV', dotenv: true, schema: { type: 'object' } })
        fastify.register(require('fastify-cors'), { origin: '*' })
        fastify.register(require('fastify-helmet'))
        fastify.register(require('fastify-no-icon'))
        fastify.register(require('fastify-postgres'), { connectionString: process.env.DATABASE_URL })
        await endpoints(fastify)
        await fastify.listen(process.env.PORT || 4000)
        fastify.log.info('Server started successfully ✅')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
};
start()