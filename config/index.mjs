export default {
  port: +process.env.PORT || 3000,
  connections: {
    dbConfig: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: "postgres"
    },
  },
};
