import { Client } from "tmi.js";
import { CommandHandleOptions } from ".";

export type RawMessageContent = string;

export interface BaseUser {
  username: string;
  displayName: string;
  id: string;
  type: "viewer" | "mod" | "global_mod" | "admin" | "staff";
}

export type Viewer = BaseUser & {
  color?: `#${string}`;
  subscriber: boolean;
  turbo: boolean;
  mod: boolean;
  // ban: (reason: string) => Promise<void>;
  // timeout: (duration: number, reason: string) => Promise<void>;
};

export type User = Omit<BaseUser, "type"> & {
  type: "";
  description: string;
  profileImage: string;
  bannerImage: string;
  viewCount: number;
  createdAt: Date;
};

export type CommandData = Omit<
  CommandHandleOptions,
  "message" | "self" | "state" | "client"
> & {
  client: Client & {
    fetchUser: (username: string) => Promise<User>;
  };
  user: Viewer;
  id?: string;
  type: "whisper" | "chat" | "action";
  commandName: string;
  rawContent: RawMessageContent;
  reply: (message: string) => Promise<[RawMessageContent]>;
  args?: string[];
  timestamp: Date;
};
