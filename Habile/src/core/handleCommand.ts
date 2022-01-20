import { CommandHandleOptions, CommandOptions } from "./Command";
import { CommandStorage } from "./types/CommandStorage";

export const handleCommand = async (
  { channel, message, user, client }: CommandHandleOptions,
  handler: CommandStorage
): Promise<void> => {
  const prefix = ".";
  const args =
    message.trim().split(/\s+/g).slice(1).length !== 0
      ? message.trim().split(/\s+/g).slice(1)
      : undefined;
  const cmdName = message.trim().split(/\s+/g)[0];

  const commandOptions: CommandOptions = {
    channel,
    user,
    client,
    reply: (message: string): void => {
      client.say(channel, message);
    },
    rawContent: message,
    args,
  };

  try {
    if (cmdName.startsWith(prefix)) {
      const command = handler.get(cmdName.slice(prefix.length));
      if (command) {
        await command.handle.call(commandOptions, args);
      }
    }
  } catch (e) {
    client.say(channel, `Error: ${e}`);
  }
};
