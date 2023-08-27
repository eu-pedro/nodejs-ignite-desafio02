/* eslint-disable prettier/prettier */
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('meals', (table) => {
    table.dropColumn('user_id')
    table.text('userId').references('users.id').onDelete('CASCADE')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('meals', (table) => {
    table.text('user_id').references('users.id').onDelete('CASCADE')
    table.text('userId')
  } )
}

