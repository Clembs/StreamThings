import { handler, poll } from "..";
import { Command } from "../core/types/Command";

export = {
  name: "newpoll",
  async handle(args) {
    if (this.viewer.username !== "clembs") return;
    else {
      const question = args.join(" ").split("/")[0].trim();
      const options = args
        .join(" ")
        .split("/")
        .map((opt) => opt.trim());
      if (question && options) {
        poll.init(question, options);

        this.reply(
          `Poll created! Make sure to vote to the poll with ${handler.prefix}vote <option>!`
        );
      }
    }
  },
} as Command;
