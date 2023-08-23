import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {
  const result = await knex('sqlite_schema').select('*')
  return result
})

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log('server is running 🚀🚀')
  })
