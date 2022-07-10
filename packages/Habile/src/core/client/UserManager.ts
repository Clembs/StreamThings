import { User } from '../structures/User';
import { APIUser } from '../types/APIUser';
import { Collection } from 'discord.js';
import fetch from 'node-fetch';

export class UserManager {
  public cache = new Collection<string, User>();

  constructor() {}

  async fetch(username: string) {
    if (this.cache.has(username)) {
      return this.cache.get(username);
    }
    try {
      const req = await fetch(
        `https://api.twitch.tv/helix/users?login=${username}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            'Client-Id': process.env.CLIENT_ID,
          },
        }
      );
      const res = await req.json();
      const raw = res.data[0] as APIUser;
      const user = new User(raw);

      this.cache.set(user.username, user);

      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
}
