import { EmbedFooterData } from 'discord.js';

interface Embed {
  title: string;
  color: string;
  url?: string;
  image?: string;
  thumbnail?: string;
  footer?: EmbedFooterData;
  timestamp?: boolean;
}

export interface Default extends Embed {
  desc?: string;
}

export interface Field extends Embed {
  field: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
}
