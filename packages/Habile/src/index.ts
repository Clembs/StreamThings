import { Client as DiscordClient } from 'discord.js';
import 'dotenv/config';
import { Client } from './core/client/Client';
import { Poll } from './core/classes/Poll';
import { handleCommand } from './core/functions';

export const poll = new Poll();
// const people: string | string[] = [];

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
    if (message.reference) {
      const msg = await message.fetchReference();
      client.say(
        'clembs',
        `(${message.author.tag} replying to ${msg.author.tag}): ${
          message.cleanContent.length >= 200
            ? `${message.cleanContent.substring(0, 197)}...`
            : message.cleanContent
        }`
      );
    } else {
      client.say(
        'clembs',
        `(${message.author.tag}): ${
          message.cleanContent.length >= 200
            ? `${message.cleanContent.substring(0, 197)}...`
            : message.cleanContent
        }`
      );
    }
  }
});

client.on('connected', async (address, port) => {
  console.log(`Connected to Twitch.tv at ${address}:${port}`);
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
  handleCommand({ channel, state, message, client, self });
});
