import { EmbedFooterData } from 'discord.js';

export interface IEmbed {
  title: string;
  color: string;
  desc?: string;
  field?: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
  url?: string;
  image?: string;
  thumbnail?: string;
  footer?: EmbedFooterData;
  timestamp?: boolean;
}
