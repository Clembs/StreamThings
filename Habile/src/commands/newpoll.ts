import { handler, poll } from "..";
import { Command } from "../core/types/Command";

export default {
  name: "newpoll",
  async handle(args) {
    if (this.user.username !== "clembs") return;
    else {
      if (args.length > 2) {
        poll.init(args![0], args!.slice(1));

        this.reply(
          `Poll created! Make sure to vote to the poll with ${handler.prefix}vote <option>!`
        );
      }
    }
  },
} as Command;
