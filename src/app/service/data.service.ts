import {Injectable, NgZone} from '@angular/core';
import {URLSearchParams, Headers, Http, Jsonp} from "@angular/http";
import {environment} from '../../environments/environment';
import {Observable} from "rxjs/Observable";
import {Subject} from 'rxjs/Subject';
import {Observer} from "rxjs/Observer";
import 'rxjs/add/operator/map';
import {IndexedDB} from "./indexed-db.service";

@Injectable()
export class DataService {

    private _VK: IVK;

    private _status: string;

    constructor(private _zone: NgZone,
                private _db: IndexedDB,
                private _http: Http,
                private _jsonp: Jsonp) {

        this._VK = VK;
        this._VK.init({
            apiId: environment.vk.apiId
        });

        this._checkLogin();
    }

    public login() {
        this._VK.Auth.login(
            () => {
                this._checkLogin();
            },
            environment.vk.scope
        );
    }

    public logout() {
        this._VK.Auth.logout(
            () => {
                this._checkLogin();
            }
        );
    }

    public isLogin(): boolean {
        return this._status === 'connected';
    }

    public apiRequest(method: string, params?: Object): Observable<any> {
        let subject = new Subject<any>(),
            requestParams = Object.assign((params || {}), {v: environment.vk.apiVersion}),
            callback = data => subject.next(data);

        /*this._db
            .addData(
                environment.db.store,
                {
                    ssn:'123-23-323-3232',
                    type:'eeeee'
                }
            )
            .subscribe(data => console.log(data));

        this._db
            .getDataAll(environment.db.store)
            .subscribe(data => console.log('data: ', data));*/

        if (this._status !== 'loaded') {
            this._VK.Auth.getLoginStatus(() => {
                this._VK.Api.call(method, requestParams, callback);
            });
        } else {
            this._VK.Api.call(method, requestParams, callback);
        }
        return subject;
    }

    public getAll(): Observable<any> {
        return this.apiRequest('wall.get', {
            owner_id: '-' + environment.smp.ownerId,
            count: '' + environment.smp.count
        });
    }

    public getPostsByHash(hash_tag: string): Observable<any> {
        return this.apiRequest('newsfeed.search', {
            //owner_id: '-' + environment.smp.ownerId,
            //query: '#' + hash_tag,
            q: '#' + hash_tag,
            count: '' + environment.smp.count
        });
    }

    public getUserInfo(ids?: number[]): Observable<any> {
        let params = {
            fields: 'photo_50'
        };

        if (ids) {
            params['user_ids'] = ids.join(',');
        }

        return this.apiRequest('users.get', params);
    }

    public createPost(message: string, date: string) {
        let session = this._VK.Auth.getSession(),
            params = {
                //owner_id: session['mid'],
                owner_id: '-' + environment.smp.ownerId,
                //from_group: 1,
                //signed: 1,
                message: DataService.tplMessage(message, date)
            };

        return this.apiRequest('wall.post', params);
    }

    private _checkLogin() {
        this._VK.Auth.getLoginStatus((results) => {
            this._zone.run(() => {
                this._status = results['status'];
            });
        });
    }

    static tplMessage(message: string, date: string) {
        return `When: ${date}\nAbout: ${message}\n#${environment.smp.tagPost}`;
    }
}
