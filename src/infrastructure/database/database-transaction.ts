import * as Knex from 'knex';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DatabaseTransaction extends Knex.Knex.Transaction {}
