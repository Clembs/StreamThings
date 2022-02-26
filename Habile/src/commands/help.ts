import { Command } from '../core/types';
import { handler } from '..';

export = {
  name: 'help',
  handle(args) {
    this.reply('See the list of commands on my about page!');
  },
} as Command;
