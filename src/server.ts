import fastify from 'fastify'
import { env } from './env'
import { usersRoutes } from './routes/users'
// import { randomUUID } from 'node:crypto'

const app = fastify()

app.register(usersRoutes, {
  prefix: 'users',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('server is running 🚀🚀')
  })
