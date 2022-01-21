import {
  CommandData,
  CommandHandleOptions,
  CommandStorage,
  RawMessageContent,
} from "./types";

export const resolveCommandData = (
  opts: CommandHandleOptions,
  handler: CommandStorage,
  cmdName: string,
  args?: string[]
): CommandData => {
  const { channel, state, message, client } = opts;

  return {
    channel,
    user: {
      color: (state.color as `#${string}`) ?? undefined,
      displayName: state.displayName,
      username: state.username as string,
      id: state["user-id"] as string,
      type: state.type ?? "viewer",
      subscriber: state.subscriber ?? false,
      mod: state.mod ?? false,
      turbo: state.turbo ?? false,
    },
    timestamp: new Date(state["tmi-sent-ts"] as string),
    type: state["message-type"] as "whisper" | "chat" | "action",
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
