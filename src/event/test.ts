import { ExtendedEvent } from '../module/event';
import { Events } from 'discord.js';
import { Log } from '../module/log';

export default new ExtendedEvent(Events.ClientReady, async () => {
  Log.info(`'./src/event/test.ts' Event Test Log`, true);
});
