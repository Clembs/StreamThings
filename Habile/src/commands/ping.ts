import { Command } from "../core/types/Command";

export = {
  name: "ping",
  meta: {
    description: "Pong!",
    usage: "ping",
  },
  async handle(args) {
    const date = new Date();
    const time = date.getTime();
    const ping = time - this.timestamp.getTime();

    this.reply(`Pong! ${args ?? ""}`).then(() => console.log);
  },
} as Command;
