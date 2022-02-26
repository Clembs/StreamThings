import { readdirSync, statSync } from 'fs';
import { Command } from '../types';
import { CommandStorage } from '../classes';

export const loadCommands = async (folder: string, handler: CommandStorage) => {
  const files = readdirSync(folder);
  for (const file of files) {
    const path = `${folder}/${file}`;
    if (statSync(path).isDirectory()) {
      const sub = await loadCommands(path, handler);
      for (const [name, command] of sub.commands) {
        handler.add(name, command);
      }
    } else {
      const command: Command = require(path).default ?? require(path);
      if (handler.commands.has(command.name)) {
        throw new Error(`Command ${command.name} already exists`);
      }
      if (command.name) {
        handler.add(command.name, command);
      }
    }
  }
  return handler;
};
