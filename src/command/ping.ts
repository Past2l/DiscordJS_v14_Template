import { ExtendedCommand } from '../module/command';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default new ExtendedCommand({
  command: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('replies with pong'),
  run: async ({ interaction }) => {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#fba0a7')
          .setTitle('Ping!')
          .setDescription('```Pong!```')
          .setFooter({
            text: interaction.user.tag,
            iconURL: interaction.user.avatarURL() || undefined,
          })
          .setTimestamp(),
      ],
      ephemeral: true,
    });
  },
});
