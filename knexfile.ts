// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  local: {
    client: 'pg',
    connection: {
      host: process.env.POSTRGRES_HOSTNAME,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.POSTGRES_PORT),
    },
    migrations: {
      directory: 'src/infrastructure/database/migrations',
    },
    seeds: {
      directory: 'src/infrastructure/database/seeds',
    },
  },
};
