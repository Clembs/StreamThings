import { handler, poll } from "..";
import { Command } from "../core/types";

export = {
  name: "endpoll",
  async handle() {
    if (this.user.username !== this.channel) return;
    else {
      poll.end();
      this.reply(
        `Poll created! Make sure to vote to the poll with ${handler.prefix}vote <option>!`
      );
    }
  },
} as Command;
