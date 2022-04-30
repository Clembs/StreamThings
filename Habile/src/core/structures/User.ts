import { APIUser } from 'core/types/APIUser';
import { ChatUserstate } from 'tmi.js';
import { BaseUser } from './BaseUser';

export class User extends BaseUser {
  public broadcasterType: string;
  public description: string;
  public profileImage: string;
  public bannerImage: string;
  public createdAt: Date;
  public viewCount: number;

  constructor(data: APIUser) {
    super(data);

    this.displayName = data.display_name;
    this.broadcasterType = data.broadcaster_type;
    this.description = data.description;
    this.profileImage = data.profile_image_url;
    this.bannerImage = data.offline_image_url;
    this.createdAt = new Date(data.created_at);
    this.viewCount = data.view_count;
  }
}
