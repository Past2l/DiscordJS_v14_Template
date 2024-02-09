import {
  Client,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
} from 'discord.js';

interface RunOptions {
  client: Client;
  interaction: ExtendedInteraction;
  args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
  command: any;
  guildId?: string[];
  run: RunFunction;
};

export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember;
}

export class ExtendedCommand {
  constructor(commandOptions: CommandType) {
    Object.assign(this, commandOptions);
  }
}
