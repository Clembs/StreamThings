import { ChatUserstate, Client } from "tmi.js";
import { CommandData } from ".";
import { User } from "./CommandData";

export type CommandHandleOptions = {
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
