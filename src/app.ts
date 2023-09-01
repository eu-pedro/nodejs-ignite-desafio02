import fastify from 'fastify'
import { usersRoutes } from './routes/users'
import { mealsRoutes } from './routes/meals'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'

export const app = fastify()

app.register(cors, {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
})
app.register(cookie)
app.register(usersRoutes, {
  prefix: 'users',
})
app.register(mealsRoutes, {
  prefix: '/meals',
})
