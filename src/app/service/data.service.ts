import {Injectable} from '@angular/core';
import {URLSearchParams, Headers, Http, Jsonp} from "@angular/http";
import {environment} from '../../environments/environment';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    private _VK: IVK;

    private _status: IVKStatus;

    constructor(private _http: Http,
                private _jsonp: Jsonp) {
        this._VK = VK;
        this._VK.init({
            apiId: environment.vk.apiId
        });

        this.getStatus()
            .subscribe(status => {
                this._status = status;
                console.log(status);
            });
    }

    public login() {
        this._VK.Auth.login(
            () => {
                console.log('login Ok');
            },
            environment.vk.scope
        );
    }

    public logout() {
        this._VK.Auth.logout(
            () => {
                console.log('logout Ok');
            }
        );
    }

    public isLogin(): boolean {
        return this._status && this._status.status === 'connected';
    }

    public getStatus(): Observable<IVKStatus> {
        return Observable.create((observer: Observer<IVKStatus>) => {
            this._VK.Auth.getLoginStatus(status => {
                observer.next(status);
            });
        });
    }

    public apiRequest(method: string, params?: Object): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            this._VK.Api.call(method, Object.assign(params, {v: environment.vk.apiVersion}), data => {
                observer.next(data);
            });
        });
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
}
