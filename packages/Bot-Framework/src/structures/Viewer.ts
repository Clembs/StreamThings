import { ChatUserstate } from 'tmi.js';
import { BaseUser } from './BaseUser';
import { Client } from '../client/Client';
import { User } from './User';

export class Viewer extends BaseUser {
  color?: `#${string}`;
  hasTurbo: boolean;
  isMod: boolean;
  isSub: boolean;

  constructor(private client: Client, data: ChatUserstate) {
    super(data);

    this.color = data.color as `#${string}`;
    this.hasTurbo = data.turbo;
    this.isMod = data.mod;
    this.isSub = data.subscriber;
    this.type = data['user-type'];
  }

  async fetchUser() {
    return this.client.users.fetch(this.username);
  }

  ban(channel: string, reason: string) {
    return this.client.ban(channel, this.username, reason);
  }

  timeout(channel: string, duration: number, reason: string) {
    return this.client.timeout(channel, this.username, duration, reason);
  }
}
