import { Command } from "core/types";
import { poll } from "..";

export = {
  name: "vote",
  handle(args) {
    if (!args) {
      this.reply("You need to specify an option to vote for!");
    } else if (!poll.created) {
      this.reply("There is no poll to vote for!");
    } else if (poll.voters.includes(this.user.username)) {
      this.reply("You have already voted!");
    } else {
      try {
        poll.vote(this.user.username, args.join(" "));
        this.reply(`You voted for ${args.join(" ")}!`);
      } catch (e) {
        this.reply(String(e));
      }
    }
  },
} as Command;
