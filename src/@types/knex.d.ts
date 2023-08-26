// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      password: string
      created_at: string
    }
    meals: {
      id: string
      name: string
      description: string
      dateAndHour: string
      isHealthy: boolean
      user_id: string
      created_at: string
    }
  }
}
