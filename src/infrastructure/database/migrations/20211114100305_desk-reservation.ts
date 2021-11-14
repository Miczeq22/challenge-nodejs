import { Knex } from 'knex';

const SCHEMA = 'public';

const TABLE = 'desk_reservation';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.withSchema(SCHEMA).createTable(TABLE, (table) => {
    table.uuid('id').notNullable().primary();
    table.uuid('desk_id').notNullable();
    table.uuid('account_id').notNullable();
    table.timestamp('start_at').notNullable();
    table.timestamp('end_at').notNullable();
    table.string('status').notNullable();

    table.foreign('account_id').references('id').inTable('account');
    table.foreign('desk_id').references('id').inTable('desk');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.withSchema(SCHEMA).dropTable(TABLE);
}
