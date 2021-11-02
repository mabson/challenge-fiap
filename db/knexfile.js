module.exports = {
    production: {
      client: 'pg',
      connection: {
        host: 'db',
        port: 5432,
        database: 'challenge',
        user: 'postgres',
        password: 'postgres',
      },
      pool: {
        min: 2,
        max: 10,
      },
      //wrapIdentifier: (value, origImpl, queryContext) => origImpl((value).toUpperCase()),
      migrations: {
        tableName: "knex_migrations",
      },
    },
  };
  