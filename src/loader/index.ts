import environmentCheck from './environment';
import databaseLoader from './database';
import discordLoader from './discord';

export default async () => {
  await environmentCheck();
  await databaseLoader();
  await discordLoader();
};
