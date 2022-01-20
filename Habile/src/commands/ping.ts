import { Command } from "../core/Command";

export = {
  name: "ping",
  handle(args) {
    this.reply(`Pong! ${args?.join(" ")}`);
  },
} as Command;
