import {
  Client,
  CommandInteractionOptionResolver,
  Interaction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';

interface RunOptions {
  client: Client;
  interaction: Interaction;
  args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

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
