import { Injectable } from '@angular/core';
import { environment }from '../../environments/environment';
import Dexie from 'dexie';

@Injectable()
export class DbService extends Dexie {

  public posts: Dexie.Table<IPostItem, number>;

  public users: Dexie.Table<IUserInfo, number>;

  constructor() {
    super(environment.db.name);

    this
      .version(environment.db.version)
      .stores({
        posts: 'id, timestamp, type, from_id, date, text',
        users: 'user_id, full_name'
      });
  }

}
