import {Injectable} from '@angular/core';
import {URLSearchParams, Headers, Http, Jsonp} from "@angular/http";
import {OAuthService} from 'angular2-oauth2/oauth-service';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    constructor(private _oAuthService: OAuthService,
                private _http: Http,
                private _jsonp: Jsonp) {
        this._oAuthService.loginUrl = environment.oauth.loginUrl;
        this._oAuthService.logoutUrl = environment.oauth.logoutUrl;
        this._oAuthService.redirectUri = environment.oauth.redirectUri;
        this._oAuthService.clientId = environment.oauth.clientId;
        this._oAuthService.scope = environment.oauth.scope;
        this._oAuthService.issuer = environment.oauth.issue;
        this._oAuthService.setStorage(localStorage);
        this._oAuthService.oidc = environment.oauth.oidc;
        this._oAuthService.tryLogin({});
    }

    public login() {
        this._oAuthService.initImplicitFlow();
    }

    public logout() {
        this._oAuthService.logOut();
    }

    public isLogin(): boolean {
        let hasIdToken = this._oAuthService.hasValidIdToken();
        let hasAccessToken = this._oAuthService.hasValidAccessToken();
        return (hasIdToken && hasAccessToken);
    }

    public apiRequest(method: string, params?: URLSearchParams): Observable<any> {
        let url: string = `${environment.apiUri}${method}`,
            search = new URLSearchParams();

        if (params) {
            search.appendAll(params);
        }
        search.set('access_token', this._oAuthService.getAccessToken());
        search.set('v', environment.apiVersion);
        search.set('extended', '1');
        search.set('callback', 'JSONP_CALLBACK');

        return new Observable((observer: Observer<any>) => {
            this._jsonp
                .get(url, {search})
                .map(response => response.json())
                .subscribe(data => observer.next(data));
        });
    }

    public getPostsByHash(hash_tag: string): Observable<any> {
        let params = new URLSearchParams();

        //params.set('owner_id', '-' + environment.apiOwnerId);
        params.set('q', '#' + hash_tag);
        params.set('count', '' + environment.smp.count);

        return this.apiRequest('newsfeed.search', params);
    }

    public getUserInfo(ids?: number[]): Observable<any> {
        let params = new URLSearchParams();

        if (ids) {
            params.set('user_ids', ids.join(','));
        }
        params.set('fields', 'photo_50');

        return this.apiRequest('users.get', params);
    }
}
