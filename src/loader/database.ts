import { createConnection } from 'typeorm';
import { enableDB } from './environment';
import { Log } from '../module/log';

export default async () => {
  if (enableDB)
    await createConnection({
      type: 'postgres',
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
    })
      .then(() => Log.info('Database Connected', true))
      .catch((error) => console.error(error));
};
