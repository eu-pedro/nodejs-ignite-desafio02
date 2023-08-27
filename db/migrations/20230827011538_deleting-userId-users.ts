/* eslint-disable prettier/prettier */
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('userId')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.text('userId')
    
  })

}

