import { APIUser } from '../types/APIUser';
import { ChatUserstate } from 'tmi.js';

export abstract class BaseUser {
  public id: string;
  public username: string;
  public displayName: string;
  public type: ChatUserstate['user-type'];

  constructor(data: ChatUserstate | APIUser) {
    this.id = data.id;
    this.username = 'username' in data ? data.username : data.login;
  }
}
