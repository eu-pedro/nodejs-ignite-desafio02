/* eslint-disable prettier/prettier */
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('meals', (table) => {
    table.dropColumn('userId')
    table.text('user_id').references('users.id').onDelete('CASCADE')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.text('userId').references('users.id').onDelete('CASCADE')
    table.dropColumn('user_id')
  })
}

