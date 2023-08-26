// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      session_id: string
      password: string
      created_at: string
    }
    meals: {
      id: string
      name: string
      description: string
      dateAndHour: string
      isHealthy: boolean
      userId: string
      created_at: string
    }
  }
}
