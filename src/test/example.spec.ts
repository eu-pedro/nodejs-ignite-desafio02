import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../app'

describe('User routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it.only('may be possible to list all users', async () => {
    const createUserResponse = await request(app.server).post('/users').send({
      name: 'john doe',
      password: 'root123',
    })

    const cookies = createUserResponse.get('Set-Cookie')

    const listUserResponse = await request(app.server)
      .get('/users')
      .set('Cookie', cookies)
      .expect(200)

    expect(listUserResponse.body.users).toEqual([
      expect.objectContaining({
        name: 'john doe',
        password: 'root123',
      }),
    ])
  })
})
