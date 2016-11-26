import {environment} from '../../environments/environment';
import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs/ReplaySubject";

const indexedDB = window.indexedDB
    || window['mozIndexedDB']
    || window['webkitIndexedDB']
    || window['msIndexedDB'];

@Injectable()
export class IndexedDB {

    private _db: IDBDatabase;

    constructor(private _baseName: string,
                private _version: number,
                private _createMethod: (db: IDBDatabase)=>void) {
    }

    public connectDB(): ReplaySubject<any> {
        let subject = new ReplaySubject<any>();

        if (this._db) {
            subject.next(this._db);
            return subject;
        }

        let request: IDBOpenDBRequest = indexedDB.open(this._baseName, this._version);

        request.onupgradeneeded = event => {
            let target = event.currentTarget,
                _db: IDBDatabase = target['result'],
                transaction = target['transaction'];

            this._createMethod(_db);
            transaction.oncomplete = event => subject.next(this._db = event.target.db);
        };
        request.onsuccess = () => subject.next(this._db = request.result);
        request.onerror = error => console.error(error);

        return subject;
    }

    public getStore(store: string, option: string = 'readonly'): ReplaySubject<any> {
        let subject = new ReplaySubject<any>();

        this.connectDB()
            .subscribe((db: IDBDatabase) => {
                subject.next(db
                    .transaction([store], option)
                    .objectStore(store)
                );
            });

        return subject;
    }

    public getData(store: string, key_path: string): ReplaySubject<any> {
        let subject = new ReplaySubject<any>();

        this.connectDB()
            .subscribe((db: IDBDatabase) => {
                let request = db.transaction([store], 'readonly')
                    .objectStore(store)
                    .get(key_path);

                request.addEventListener('onerror', error => console.error(error));
                request.addEventListener('onsuccess', () => subject.next(request.result));
            });
        return subject;
    }

    public getDataAll(store: string): ReplaySubject<any> {
        let subject = new ReplaySubject<any>();

        this.connectDB()
            .subscribe((db: IDBDatabase) => {
                let list = [];

                db
                    .transaction([store], 'readonly')
                    .objectStore(store)
                    .openCursor()
                    .onsuccess = (event) => {
                    let cursor: IDBCursor = event.target['result'];

                    if (!cursor) {
                        subject.next(list);
                        return;
                    }

                    list.push(cursor);
                    cursor.continue();
                };
            });

        return subject;
    }

    public addData(store: string, value: any, key_path?: string): ReplaySubject<any> {
        let subject = new ReplaySubject<any>();

        this.connectDB()
            .subscribe((db: IDBDatabase) => {
                let request = db
                    .transaction([store], 'readwrite')
                    .objectStore(store)
                    .add(value, key_path);

                request.onsuccess = () => subject.next(request.result);
                request.onerror = error => console.error(error);
            });

        return subject;
    }

    public putData(store: string, value: any, key_path?: string): ReplaySubject<any> {
        let subject = new ReplaySubject<any>();

        this.connectDB()
            .subscribe((db: IDBDatabase) => {
                let request = db
                    .transaction([store], 'readwrite')
                    .objectStore(store)
                    .put(value, key_path);

                request.onsuccess = () => subject.next(request.result);
                request.onerror = error => console.error(error);
            });

        return subject;
    }

    public removeData(store: string, key_path: string): ReplaySubject<any> {
        let subject = new ReplaySubject<any>();

        this.connectDB()
            .subscribe((db: IDBDatabase) => {
                let request = db.transaction([store], 'readwrite')
                    .objectStore(store)
                    .delete(key_path);

                request.onsuccess = () => subject.next(true);
                request.onerror = error => console.error(error);
            });

        return subject;
    }
}
