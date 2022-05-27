import { Client } from '../client/Client';
import { CommandRawOptions } from '.';
import { Viewer, User } from '../structures';

export type RawMessageContent = string;

export type CommandData = Omit<
  CommandRawOptions,
  'message' | 'self' | 'state' | 'client'
> & {
  client: Client;
  viewer: Viewer;
  user: User;
  id?: string;
  type: 'whisper' | 'chat' | 'action';
  commandName: string;
  rawContent: RawMessageContent;
  reply: (message: string) => Promise<[RawMessageContent]>;
  args?: string[];
  timestamp: Date;
};
