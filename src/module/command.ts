import {
  Client,
  CommandInteractionOptionResolver,
  Interaction,
} from 'discord.js';

interface RunOptions {
  client: Client;
  interaction: Interaction;
  args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
  command: any;
  guildId?: string[];
  run: RunFunction;
};

export class ExtendedCommand {
  constructor(commandOptions: CommandType) {
    Object.assign(this, commandOptions);
  }
}
