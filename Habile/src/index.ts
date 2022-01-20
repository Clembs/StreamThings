import { Client } from "tmi.js";
import "dotenv/config";
import { CommandStorage } from "./core/types/CommandStorage";
import { CommandData } from "./core/Command";
import { handleCommand } from "./core/handleCommand";
import { loadCommands } from "./core/loadCommands";

const handler: CommandStorage = new Map<string, CommandData>();

const client = new Client({
  identity: {
    username: "crbtbot",
    password: process.env.OAUTH_TOKEN,
  },
  options: {
    debug: true,
    clientId: process.env.CLIENT_ID,
  },
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: ["crbtbot", "clembs"],
});

client.connect();

client.on("connected", async (address, port) => {
  console.log(`Connected to Twitch.tv at ${address}:${port}`);
  await loadCommands(`${__dirname}/commands`, handler).then((handler) => {
    console.log(`Loaded ${handler.size} commands.`);
    console.log(handler);
  });
});

client.on("message", (channel, user, message, self) => {
  if (self) return;
  else handleCommand({ channel, user, message, client, self }, handler);
});
