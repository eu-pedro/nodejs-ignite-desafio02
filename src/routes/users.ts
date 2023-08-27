import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { checkSessionIdExists } from '../middleware/check-session-id-exists'

export async function usersRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const sessionId = request.cookies.sessionId

      const users = await knex('users')
        .where('session_id', sessionId)
        .select('*')
      return { users }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getUserParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getUserParamsSchema.parse(request.params)
      const { sessionId } = request.cookies

      const user = await knex('users')
        .select()
        .where({
          session_id: sessionId,
          id,
        })
        .first()

      return { user }
    },
  )

  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      password: z.string(),
    })

    const { name, password } = createUserBodySchema.parse(request.body)

    let { sessionId } = request.cookies

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 3, // 3 days
      })
    }

    await knex('users').insert({
      id: randomUUID(),
      name,
      password,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })

  app.delete('/:id', async (request, reply) => {
    const getIdUserParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getIdUserParamsSchema.parse(request.params)

    await knex('users').where({ id }).del()

    return reply.status(204).send()
  })

  app.put('/:id', async (request, reply) => {
    const getIdUserParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const getUserBodySchema = z.object({
      name: z.string(),
      password: z.string(),
    })

    const { name, password } = getUserBodySchema.parse(request.body)

    const { id } = getIdUserParamsSchema.parse(request.params)

    await knex('users').update({ name, password }).where({ id })

    return reply.status(204).send()
  })
}
