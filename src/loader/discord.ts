import { ExtendedClient } from '../module/client';

export const client = new ExtendedClient();

export default async () => {
  await client.start();
};
