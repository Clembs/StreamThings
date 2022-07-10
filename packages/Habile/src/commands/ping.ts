import { Command } from '../core/types/Command';

export = {
  name: 'ping',
  async handle() {
    this.reply(
      `Pong! Latency: ${new Date().getTime() - this.timestamp.getTime()}ms`
    );
  },
} as Command;
