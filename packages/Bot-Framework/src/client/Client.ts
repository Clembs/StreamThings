import { Client as TmiClient, Options } from 'tmi.js';
import { Command } from '../types';
import { UserManager } from './UserManager';

export class Client extends TmiClient {
  constructor(public options?: Options) {
    super({
      ...options,
      connection: {
        secure: true,
        reconnect: true,
      },
      options: {
        debug: true,
        clientId: process.env.CLIENT_ID,
      },
    });
  }

  public prefix = ':';
  public commands = new Map<string, Command>();
  public users = new UserManager();

  public get user() {
    return this.users.fetch(this.getUsername());
  }
}
