import {environment} from '../../environments/environment';
import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {PostType} from "./data.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/fromPromise";

import {SmpDatabase} from './db';

@Injectable()
export class IndexedDB {

    private _db: SmpDatabase;

    constructor() {
        this._db = new SmpDatabase(
            environment.db.name,
            environment.db.version
        );
    }

    public getPostsByType(type: PostType, limit: number, offset: number) {
        return Observable.fromPromise(
            Promise.resolve(
                this._db
                    .posts
                    .where('type').equals(type)
                    .offset(offset).limit(limit)
                    .toArray()
            )
        );
    }

    public getAllPosts(limit: number, offset: number) {
        this._db
            .posts
            .offset(offset).limit(limit)
    }
}
