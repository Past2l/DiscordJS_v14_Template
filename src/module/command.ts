import {
  Client,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';

interface RunOptions {
  client: Client;
  interaction: ExtendedInteraction;
  args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember;
}

export type CommandType = {
  command: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  guildId?: string[];
  run: RunFunction;
};

export class ExtendedCommand {
  constructor(commandOptions: CommandType) {
    Object.assign(this, commandOptions);
  }
}
