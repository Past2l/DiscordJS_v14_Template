export const ENVIRONMENT_NAMES = [
  'BOT_TOKEN',
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_NAME',
];

export default async () => {
  for (const name of ENVIRONMENT_NAMES)
    if (!process.env[name]) throw new Error(`Environment '${name}' is empty`);
};
