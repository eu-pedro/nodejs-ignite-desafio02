import fastify from 'fastify'
import { knex } from './database'
import { randomUUID } from 'node:crypto'

const app = fastify()

app.get('/hello', async () => {
  const users = await knex('users').select('*')

  return users
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('server is running 🚀🚀')
  })
