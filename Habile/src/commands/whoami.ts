import { Command } from "core/types";

export = {
  name: "whoami",
  async handle() {
    this.reply(
      `${this.viewer.displayName} (${this.viewer.id}) - ${this.viewer.type} - ${this.viewer.color}`
    );
  },
} as Command;
