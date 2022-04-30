import { CommandData, CommandRawOptions, RawMessageContent } from '../types';
import { CommandStorage } from '../classes';
import { Viewer } from '../structures/Viewer';

export const resolveCommandData = async (
  opts: CommandRawOptions,
  handler: CommandStorage,
  cmdName: string,
  args?: string[]
): Promise<CommandData> => {
  const { channel, state, message, client } = opts;

  const user =
    client.users.cache.get(state.username) ??
    (await client.users.fetch(state.username));

  return {
    channel,
    viewer: new Viewer(client, state),
    user,
    timestamp: new Date(parseInt(state['tmi-sent-ts'])),
    type: state['message-type'] as 'whisper' | 'chat' | 'action',
    client,
    id: state.id,
    reply: async (message: string): Promise<[RawMessageContent]> => {
      return await client.say(channel, message);
    },
    commandName: cmdName.slice(handler.prefix.length),
    rawContent: message,
    args,
  };
};
