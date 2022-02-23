import { resolveCommandData } from "./resolveCommandData";
import { CommandHandleOptions } from "../types";
import { CommandStorage } from "../classes";

export const handleCommand = async (
  opts: CommandHandleOptions,
  handler: CommandStorage
): Promise<void> => {
  const { channel, message, client } = opts;

  const args =
    message.trim().split(/\s+/g).slice(1).length !== 0
      ? message.trim().split(/\s+/g).slice(1)
      : undefined;
  const commandName = message.trim().split(/\s+/g)[0];
  const commandData = resolveCommandData(opts, handler, commandName, args);

  try {
    if (commandName.startsWith(handler.prefix)) {
      const command = handler.commands.get(
        commandName.slice(handler.prefix.length)
      );
      if (command) {
        await command.handle.call(commandData, args);
      }
    }
  } catch (e) {
    client.say(channel, `Error: ${e}`);
  }
};
