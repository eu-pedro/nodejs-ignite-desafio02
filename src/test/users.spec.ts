import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../app'

describe('User routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    // execSync('npm run knex -- migrate:rollback')
    execSync('npm run knex -- migrate:latest')
  })

  it('should be able to list all users', async () => {
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

  it('should be able to get a specific user', async () => {
    const createUserResponse = await request(app.server).post('/users').send({
      name: 'john doe',
      password: 'root123',
    })

    const cookies = createUserResponse.get('Set-Cookie')

    const listUserResponse = await request(app.server)
      .get('/users')
      .set('Cookie', cookies)
      .expect(200)

    const userId = listUserResponse.body.users[0].id

    const getUserResponse = await request(app.server)
      .get(`/users/${userId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getUserResponse.body.user).toEqual(
      expect.objectContaining({
        name: 'john doe',
        password: 'root123',
      }),
    )
  })
})
