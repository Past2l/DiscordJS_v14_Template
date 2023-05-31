import { createConnection } from 'typeorm';

export default async () => {
  await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ''),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/../**/*.entity.{ts,js}`],
    migrations: [],
    subscribers: [],
    charset: 'utf8mb4',
  })
    .then(() => console.log('Database Connected'))
    .catch((error) => console.error(error));
};
