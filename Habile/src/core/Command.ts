import { ChatUserstate, Client } from "tmi.js";

export type CommandHandleOptions = {
  channel: string;
  user: ChatUserstate;
  message: string;
  self: boolean;
  client: Client;
};

export type CommandOptions = Omit<CommandHandleOptions, "message" | "self"> & {
  rawContent: string;
  reply: (message: string) => void;
  args?: string[];
};

export type CommandData = {
  name: string;
  handle: (this: CommandOptions, args?: string[]) => Promise<void> | void;
};

export type Command = CommandData;
