import { Knex } from 'knex';

const SCHEMA = 'public';

const TABLE = 'desk';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.withSchema(SCHEMA).createTable(TABLE, (table) => {
    table.uuid('id').notNullable().primary();
    table.string('office_name').notNullable();
    table.string('location').notNullable();
    table.string('type').notNullable();
    table.string('size').notNullable();
    table.timestamp('created_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.withSchema(SCHEMA).dropTable(TABLE);
}
