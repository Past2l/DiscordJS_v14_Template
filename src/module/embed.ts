import { EmbedBuilder, ColorResolvable } from 'discord.js';
import { IEmbed } from '../interface/embed';

export class Embed {
  static default(data: IEmbed) {
    const embed = new EmbedBuilder()
      .setColor(data.color as ColorResolvable)
      .setTitle(data.title);
    if (data.field) embed.addFields(data.field);
    if (data.url) embed.setURL(data.url);
    if (data.image) embed.setImage(data.image);
    if (data.thumbnail) embed.setThumbnail(data.thumbnail);
    if (data.desc) embed.setDescription(data.desc);
    if (data.footer) embed.setFooter(data.footer);
    if (data.timestamp) embed.setTimestamp();
    return embed;
  }

  static error(content) {
    return {
      embeds: [
        this.default({
          color: '#ff0000',
          title: '오류가 발생하였습니다.',
          desc: `\`\`\`${content}\`\`\``,
          timestamp: true,
        }),
      ],
      ephemeral: true,
    };
  }
}
