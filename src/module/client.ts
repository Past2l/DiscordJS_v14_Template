import {
  Client,
  CommandInteractionOptionResolver,
  Events,
  GatewayIntentBits,
  Routes,
} from 'discord.js';
import { CommandType, ExtendedEvent, ExtendedInteraction, Log } from '.';
import { promisify } from 'util';
import glob from 'glob';

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
  commands: Map<string, CommandType> = new Map();
  guildCommands: Map<string, object[]> = new Map();

  constructor() {
    super({
      intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
      ],
    });
  }

  async start() {
    await this.registerModules();
    await this.login(process.env.BOT_TOKEN);
  }

  async registerModules() {
    await this.addEvents();
    await this.addCommands();
    this.on(Events.InteractionCreate, (interaction) => {
      if (interaction.isCommand()) {
        const command = this.commands.get(interaction.commandName);
        if (command)
          command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client: this,
            interaction: interaction as ExtendedInteraction,
          });
      }
    });
    this.on(Events.ClientReady, async (client) => {
      await this.registerCommands();
      Log.info(`Logged in as \x1b[33m${client.user.tag}\x1b[0m!`, true);
    });
  }

  async importFile(path: string) {
    return (await import(path))?.default;
  }

  async addCommands() {
    const commandList = await globPromise(
      `${__dirname}/../command/**/*{.ts,.js}`,
    );
    for (const path of commandList) {
      const command: CommandType = await this.importFile(path);
      if (!command.command) return;
      this.commands.set(command.command.name, command);
      Log.info(
        `Added \x1b[33m${command.command.name}\x1b[0m Command (Location : \x1b[32m${path}\x1b[0m)`,
        true,
      );
    }
  }

  async registerCommands() {
    if (!process.env.BOT_TOKEN) throw new Error('No Token Provided');
    if (!this.application) throw new Error('No Application Provided');
    this.rest.setToken(process.env.BOT_TOKEN);
    const commandList = Array.from(this.commands.values());
    const guilds = Array.from(this.guilds.cache.values());
    for (const guild of guilds) {
      const fetch = await guild.commands.fetch();
      if (fetch.size > 0)
        await this.rest.put(
          Routes.applicationGuildCommands(
            this.application.id,
            guild.id.toString(),
          ),
          { body: [] },
        );
    }
    commandList.map((v) => {
      v.guildId?.forEach((id) => {
        if (!this.guildCommands.get(id)) this.guildCommands.set(id, []);
        this.guildCommands.get(id)?.push(v.command.toJSON());
      });
    });
    for (const id of this.guildCommands.keys()) {
      Log.info(`Registering Commands to \x1b[32m${id}\x1b[0m`, true);
      await this.rest.put(
        Routes.applicationGuildCommands(this.application.id, id),
        { body: this.guildCommands.get(id) },
      );
    }
    await this.rest.put(Routes.applicationCommands(this.application.id), {
      body: commandList
        .filter((v) => !v.guildId || v.guildId.length < 1)
        .map((v) => v.command.toJSON()),
    });
  }

  async addEvents() {
    const events = await globPromise(`${__dirname}/../event/**/*{.ts,.js}`);
    for (const path of events) {
      const event: ExtendedEvent<any> = await this.importFile(path);
      Log.info(
        `Added \x1b[33m${event.event}\x1b[0m Event (Location : \x1b[32m${path}\x1b[0m)`,
        true,
      );
      this.on(event.event, event.run);
    }
  }
}
