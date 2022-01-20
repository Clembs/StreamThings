import { readdirSync, statSync } from "fs";
import { CommandStorage } from "./types/CommandStorage";
import { Command, CommandData } from "./Command";

export const loadCommands = async (folder: string, handler: CommandStorage) => {
  const files = readdirSync(folder);
  for (const file of files) {
    const path = `${folder}/${file}`;
    if (statSync(path).isDirectory()) {
      const subCommands = await loadCommands(path, handler);
      for (const [name, command] of subCommands) {
        handler.set(name, command);
      }
    } else {
      const command: Command = require(path).default ?? require(path);
      if (handler.has(command.name)) {
        throw new Error(`Command ${command.name} already exists`);
      }
      handler.set(command.name, command);
    }
  }
  return handler;
};
