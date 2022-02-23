import { Command } from "../types";

export class CommandStorage {
  public commands = new Map<string, Command>();
  public prefix = ",";

  add(name: string, command: Command) {
    this.commands.set(name, command);
  }
}
