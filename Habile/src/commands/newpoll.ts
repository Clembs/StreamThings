import { handler, poll } from "..";
import { Command } from "../core/types/Command";

export = {
  name: "newpoll",
  async handle(args) {
    // if (this.user.username !== this.channel) return;
    const title = args.join(" ").split("/")[0].trim();
    const options = args
      .join(" ")
      .split("/")
      .slice(1)
      .map((option) => option.trim());
    if (title && options) {
      poll.init(title, options);
      this.reply(
        `Poll created! Make sure to vote to the poll with ${handler.prefix}vote <option>!`
      );
    }
  },
} as Command;
