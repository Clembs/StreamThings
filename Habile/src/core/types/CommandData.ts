import { CommandHandleOptions } from ".";

export type RawMessageContent = string;

export type User = {
  username: string;
  displayName: string;
  id: string;
  type: "viewer" | "mod" | "global_mod" | "admin" | "staff";
  color?: `#${string}`;
  subscriber: boolean;
  turbo: boolean;
  mod: boolean;
};

export type CommandData = Omit<
  CommandHandleOptions,
  "message" | "self" | "state"
> & {
  user: User;
  id?: string;
  type: "whisper" | "chat" | "action";
  commandName: string;
  rawContent: RawMessageContent;
  reply: (message: string) => Promise<[RawMessageContent]>;
  args?: string[];
  timestamp: Date;
};
