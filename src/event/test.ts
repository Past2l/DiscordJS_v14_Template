import { ExtendedEvent } from '../module/event';
import { Events } from 'discord.js';

export default new ExtendedEvent(Events.ClientReady, async () => {
  console.log('Event Test');
});
