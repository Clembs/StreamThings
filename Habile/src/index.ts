import { Client } from 'tmi.js';
import 'dotenv/config';
import { CommandStorage, Poll } from './core/classes';
import { loadCommands, handleCommand, fetchUser } from './core/functions';
import { addPersonToCanvas } from './core/functions/addPersonToCanvas';
import fetch from 'node-fetch';

export const handler = new CommandStorage();
export const poll = new Poll();
const people: string | string[] = [];

const client = new Client({
  identity: {
    username: 'crbtbot',
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
  channels: ['crbtbot', 'clembs'],
});

client.connect();

client.on('connected', async (address, port) => {
  console.log(`Connected to Twitch.tv at ${address}:${port}`);
  await loadCommands(`${__dirname}/commands`, handler).then((handler) => {
    console.log(`Loaded ${handler.commands.size} commands.`);
    console.log(handler);
  });
});

client.on('message', async (channel, state, message, self) => {
  if (self) return;

  if (!people.includes(state.username)) {
    people.push(state.username);
    const req = await fetch('http://localhost:3000/api/addPerson', {
      method: 'POST',
      body: JSON.stringify({
        name: state.username,
        avatar: await fetchUser(state.username).then((u) => u.profileImage),
      }),
    });
    console.log(await req.json());
    // addPersonToCanvas(await fetchUser(state.username));
  }
  handleCommand({ channel, state, message, client, self }, handler);
});
