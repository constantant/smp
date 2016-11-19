import {Injectable, NgZone} from '@angular/core';
import {URLSearchParams, Headers, Http, Jsonp} from "@angular/http";
import {environment} from '../../environments/environment';
import {Observable} from "rxjs/Observable";
import {Subject} from 'rxjs/Subject';
import {Observer} from "rxjs/Observer";
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    private _VK: IVK;

    private _status: string;

    constructor(private _zone: NgZone,
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

        if (this._status !== 'loaded') {
            this._VK.Auth.getLoginStatus(() => {
                this._VK.Api.call(method, requestParams, callback);
            });
        } else {
            this._VK.Api.call(method, requestParams, callback);
        }
        return subject;
    }

    public getPostsByHash(hash_tag: string): Observable<any> {
        return this.apiRequest('wall.search', {
            owner_id: '-' + environment.smp.ownerId,
            query: '#' + hash_tag,
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

    public createPost(message) {
        let params = {
            owner_id: '-' + environment.smp.ownerId,
            message: message
        };

        return this.apiRequest('wall.post', params);
    }

    private _checkLogin(){
        this._VK.Auth.getLoginStatus((results) => {
            this._zone.run(() => {
                this._status = results['status'];
            });
        });
    }
}
