import { resolveCommandData } from './resolveCommandData';
import { CommandRawOptions } from '../types';
import fetch from 'node-fetch';
import { db } from '../structures/Database';

const habileCoinCooldown = new Map<string, Date>();

export const handleCommand = async (opts: CommandRawOptions): Promise<void> => {
  const { channel, message, client, state, self } = opts;

  const args =
    message.trim().split(/\s+/g).slice(1).length !== 0
      ? message.trim().split(/\s+/g).slice(1)
      : undefined;
  const commandName = message.trim().split(/\s+/g)[0];
  const commandData = await resolveCommandData(opts, commandName, args);

  if (
    channel === '#clembs' &&
    state['message-type'] === 'chat' &&
    !self &&
    !message.startsWith(client.prefix)
  ) {
    await fetch(process.env.DISCORD_TOKEN, {
      method: 'POST',
      body: JSON.stringify({
        username: commandData.user.displayName,
        avatar_url: commandData.user.profileImage,
        content: message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  if (habileCoinCooldown.get(state.username) < new Date()) {
    db.add(state.username, Math.floor(Math.random() * 10) + 1);

    habileCoinCooldown.set(state.username, new Date(Date.now() + 5000));
  }

  try {
    if (commandName.startsWith(client.prefix)) {
      const command = client.commands.get(
        commandName.slice(client.prefix.length)
      );
      if (command) {
        await command.handle.call(commandData, args);
      }
    }
  } catch (e) {
    client.say(channel, `Error: ${e}`);
  }
};
