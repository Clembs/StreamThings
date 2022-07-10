import { db } from '../core/structures/Database';
import { Command } from '../core/types/Command';

export = {
  name: 'balance',
  async handle(args) {
    await this.reply(
      `${this.user.username}'s balance is ${db.get(this.user.username)}`
    );
  },
} as Command;
