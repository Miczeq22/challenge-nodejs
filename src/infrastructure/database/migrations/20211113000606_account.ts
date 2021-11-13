import * as Knex from 'knex';

const SCHEMA = 'public';

const TABLE = 'account';

export async function up(knex: Knex.Knex): Promise<void> {
  return knex.schema.withSchema(SCHEMA).createTable(TABLE, (table) => {
    table.uuid('id').notNullable().primary();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamp('registered_at').notNullable();
  });
}

export async function down(knex: Knex.Knex): Promise<void> {
  return knex.schema.withSchema(SCHEMA).dropTable(TABLE);
}
