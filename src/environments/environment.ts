// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    smp: {
        ownerId: 78725629,
        count: 10,
        tagPost: 'spymeplease',
        tagReport: 'spymepleasereport',
        getTagReportByModel: model_vk_id => `hey_${model_vk_id}_look_at_self`
    },
    db: {
        name: 'spymeplease',
        storeList: 'list',
        storeUsers: 'users',
        version: 1,
        createMethod: (db: IDBDatabase) => {
            let storeList: IDBObjectStore = db.createObjectStore(environment.db.storeList, {keyPath: 'id'}),
                storeUsers: IDBObjectStore = db.createObjectStore(environment.db.storeUsers, {keyPath: 'id'});

            storeList.createIndex('type', 'type', {unique: false});
            storeList.createIndex('from_id', 'from_id', {unique: false});
        }
    },
    vk: {
        apiVersion: '5.60',
        apiId: 4022476,
        scope: 8196
    },
    googleMapsKey: 'AIzaSyCO8eX3MDiI1EaqnH_0vaDbXet74ss7TDI'
};
