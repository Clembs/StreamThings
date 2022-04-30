import { Command } from '../core/types/Command';

export = {
  name: 'ban',
  async handle(args) {
    if (!this.viewer.isMod) return;
    else {
      await this.client.ban(this.channel, args[0], args.slice(1).join(' '));
    }
  },
} as Command;
