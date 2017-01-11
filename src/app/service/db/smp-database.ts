import Dexie from 'dexie';

export class SmpDatabase extends Dexie {

    public posts: Dexie.Table<IPostItem, number>;

    public users: Dexie.Table<IUserInfo, number>;

    public constructor(private _dbName: string,
                       private _dbVersion: number) {
        super(_dbName);

        this.version(_dbVersion)
            .stores({
                posts: '++id, type, created_by, dateEvent, date, text, geo, images',
                users: '++id, first_name, last_name, photo_50'
            });

    }
}
