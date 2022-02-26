import {
  CommandData,
  CommandHandleOptions,
  RawMessageContent,
  User,
} from '../types';
import { CommandStorage } from '../classes';
import fetch from 'node-fetch';

export const resolveCommandData = (
  opts: CommandHandleOptions,
  handler: CommandStorage,
  cmdName: string,
  args?: string[]
): CommandData => {
  const { channel, state, message, client } = opts;
  return {
    channel,
    viewer: {
      color: (state.color as `#${string}`) ?? undefined,
      displayName: state['display-name'],
      username: state.username as string,
      id: state['user-id'] as string,
      type: state.type ?? 'viewer',
      subscriber: state.subscriber ?? false,
      mod: state.mod ?? false,
      turbo: state.turbo ?? false,
      fetchUser: async () =>
        (await fetchUser(state.username as string)) as User,
    },
    timestamp: new Date(parseInt(state['tmi-sent-ts'])),
    type: state['message-type'] as 'whisper' | 'chat' | 'action',
    client: Object.assign(client, {
      fetchUser,
    }),
    id: state.id,
    reply: async (message: string): Promise<[RawMessageContent]> => {
      return await client.say(channel, message);
    },
    commandName: cmdName.slice(handler.prefix.length),
    rawContent: message,
    args,
  };
};

export const fetchUser = async (username: string): Promise<User> => {
  const req = await fetch(
    `https://api.twitch.tv/helix/users?login=${username}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        'Client-Id': process.env.CLIENT_ID,
      },
    }
  );
  const user = ((await req.json()) as any).data[0];

  return {
    username: user.login,
    displayName: user.display_name,
    id: user.id,
    type: user.type,
    createdAt: new Date(user.created_at),
    description: user.description,
    viewCount: user.view_count,
    profileImage: user.profile_image_url,
    bannerImage: user.offline_image_url,
  };
};
