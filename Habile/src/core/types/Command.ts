import { Client } from '../client/Client';
import { ChatUserstate } from 'tmi.js';
import { CommandData } from '.';

export type CommandRawOptions = {
  channel: string;
  message: string;
  state: ChatUserstate;
  self: boolean;
  client: Client;
};

export type Command = {
  name: string;
  meta: {
    description: string;
    usage?: string;
    [key: string]: string | undefined;
  };
  handle: (this: CommandData, args?: string[]) => Promise<void> | void;
};
