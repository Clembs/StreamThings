import { Command } from "../core/types";
import { handler } from "..";

export = {
  name: "help",
  meta: {
    description: "Displays a list of commands.",
    usage: "help",
  },
  handle(args) {
    this.reply("See the list of commands on my about page!");
    // if (args) {
    //   const command = handler.commands.get(args[0]) as Command;
    //   const meta = Object.entries(command.meta).map(([key, value]) => {
    //     return `${
    //       //title case
    //       key
    //         .split("")
    //         .map((char, index) => (index === 0 ? char.toUpperCase() : char))
    //         .join("")
    //     }: ${value}`;
    //   });

    //   this.reply(`${command.name} - ${meta.join("\n")}`);
    // } else {
    //   const commands = Array.from(handler.commands);
    //   const commandList = commands.map(
    //     ([name, command]) => `${command.name}: ${command.meta.description}`
    //   );

    //   this.reply(`Available commands:`);
    //   for (const command of commandList) {
    //     this.reply(`- ${command}`);
    //   }
    // }
  },
} as Command;
