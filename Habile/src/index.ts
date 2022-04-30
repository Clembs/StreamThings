import { Client as DiscordClient } from 'discord.js';
import 'dotenv/config';
import { CommandStorage, Poll } from './core/classes';
import { loadCommands, handleCommand } from './core/functions';
import { Client } from './core/client/Client';

export const handler = new CommandStorage();
export const poll = new Poll();
const people: string | string[] = [];

const client = new Client({
  identity: {
    username: 'habilebot',
    password: process.env.OAUTH_TOKEN,
  },
  channels: ['habilebot', 'clembs'],
});

const discord = new DiscordClient({
  intents: ['GUILD_MESSAGES', 'GUILDS'],
  presence: {
    activities: [
      {
        name: 'Clembs',
        type: 'STREAMING',
        url: 'https://twitch.tv/clembs',
      },
    ],
  },
});

discord.login();
client.connect();

discord.on('ready', async (client) => {
  console.log(`Connected to Discord as ${discord.user.tag}`);
});

discord.on('messageCreate', async (message) => {
  if (
    message.channelId === '969968814542430328' &&
    !message.author.bot &&
    !message.webhookId
  ) {
    client.say(
      'clembs',
      `[${message.author.tag}]: ${message.cleanContent.substring(0, 200)}`
    );
  }
});

client.on('connected', async (address, port) => {
  console.log(`Connected to Twitch.tv at ${address}:${port}`);
  await loadCommands(`${__dirname}/commands`, handler).then((handler) => {
    console.log(`Loaded ${handler.commands.size} commands.`);
  });
});

client.on('message', async (channel, state, message, self) => {
  if (self) return;

  //   if (!people.includes(state.username)) {
  //     people.push(state.username);
  //     const req = await fetch('http://localhost:3000/api/addPerson', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         name: state.username,
  //         avatar: await fetchUser(state.username).then((u) => u.profileImage),
  //       }),
  //     });
  //     // console.log(await req.json());
  //   }
  handleCommand({ channel, state, message, client, self }, handler);
});

// client.on('join', (channel, username, self) => {
//   console.log(username, channel);
// });

// client.on('action', (channel, state, action) => {
//   console.log(state, action, channel);
// });
