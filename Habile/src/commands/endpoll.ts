import { handler, poll } from "..";
import { Command } from "../core/types";

export = {
  name: "endpoll",
  async handle() {
    if (this.viewer.username !== this.channel) return;
    else {
      poll.end();
      this.reply(`Poll ended!`);
    }
  },
} as Command;
