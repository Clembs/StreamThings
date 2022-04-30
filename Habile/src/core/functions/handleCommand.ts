import { resolveCommandData } from './resolveCommandData';
import { CommandRawOptions } from '../types';
import { CommandStorage } from '../classes';
import fetch from 'node-fetch';

export const handleCommand = async (
  opts: CommandRawOptions,
  handler: CommandStorage
): Promise<void> => {
  const { channel, message, client, state, self } = opts;

  const args =
    message.trim().split(/\s+/g).slice(1).length !== 0
      ? message.trim().split(/\s+/g).slice(1)
      : undefined;
  const commandName = message.trim().split(/\s+/g)[0];
  const commandData = await resolveCommandData(
    opts,
    handler,
    commandName,
    args
  );

  if (
    channel === '#clembs' &&
    state['message-type'] === 'chat' &&
    !self &&
    !message.startsWith(handler.prefix)
  ) {
    await fetch(
      'https://discord.com/api/webhooks/969669010318839818/LjMbtO-E4Tq_rgPT9tftJwuSmFa2kfYpb5YI14u3ENAOti8IEQdZ-ounMJG2B-JX18BO',
      {
        method: 'POST',
        body: JSON.stringify({
          username: commandData.user.displayName,
          avatar_url: commandData.user.profileImage,
          content: message,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

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
