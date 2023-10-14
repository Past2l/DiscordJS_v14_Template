export const ENVIRONMENT_NAMES = ['BOT_TOKEN'];

export const DB_ENVIRONMENT_NAMES = [
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_NAME',
];

export let enableDB = true;

export default async () => {
  for (const name of ENVIRONMENT_NAMES)
    if (!process.env[name]) throw new Error(`Environment '${name}' is empty`);
  for (const name of DB_ENVIRONMENT_NAMES)
    if (!process.env[name] && enableDB) enableDB = false;
};
