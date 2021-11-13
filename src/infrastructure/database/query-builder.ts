import * as Knex from 'knex';
import { DatabaseConfig, postgresConfig } from './query-builder.config';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface QueryBuilder extends Knex.Knex {}

export type DatabaseClient = 'pg';

export const createQueryBuilder = (client: DatabaseClient, config: DatabaseConfig) =>
  Knex.default({
    client,
    connection: config,
  }) as QueryBuilder;

export const postgresQueryBuilder = () => createQueryBuilder('pg', postgresConfig);
