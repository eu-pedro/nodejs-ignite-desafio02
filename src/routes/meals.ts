import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'

export async function mealsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const meals = await knex('meals').select('*')

    return { meals }
  })

  app.get('/:id', async (request) => {
    console.log(request.params)

    const getIdMealParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getIdMealParamsSchema.parse(request.params)

    const meal = await knex('meals')
      .where('meals.userId', id)
      .join('users', 'users.id', '=', 'meals.userId')
      .select('meals.*', 'users.name')

    return { meal }
  })

  app.post('/', async (request, reply) => {
    const createMealsBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isHealthy: z.boolean(),
      userId: z.string(),
    })

    const { name, description, isHealthy, userId } =
      createMealsBodySchema.parse(request.body)

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      isHealthy,
      userId,
    })

    return reply.status(201).send()
  })

  app.delete('/:id', async (request, reply) => {
    const getIdMealsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getIdMealsParamsSchema.parse(request.params)

    await knex('meals').where('meals.userId', id).del()

    return reply.status(204).send()
  })
}
