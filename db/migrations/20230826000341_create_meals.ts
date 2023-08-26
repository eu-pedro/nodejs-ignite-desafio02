/* eslint-disable prettier/prettier */
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable()
    table.text('description').notNullable()
    table.timestamp('dateAndHour').defaultTo(knex.fn.now()).notNullable()
    table.boolean('isHealthy').defaultTo(false).notNullable()
    table.text('user_id').references('users.id')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}

