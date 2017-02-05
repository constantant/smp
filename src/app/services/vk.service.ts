import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class VkService {

  public loaded: EventEmitter<IVK> = new EventEmitter<IVK>();

  public status: EventEmitter<string> = new EventEmitter<string>();

  private _sdk: IVK;

  private _status: string;

  constructor(private _ngZone: NgZone) {
    VkService._insertVkSDK(environment.vk.sdk);
    this._checkLoaded((vk: IVK) => {
      this.loaded.emit(this._sdk = vk);
    });

    this.loaded.subscribe(() => {
      this._sdk.init({
        apiId: environment.vk.apiId
      });
    })
  }

  public getUserInfo(): Observable<IVKResponseUsers> {
    return this.request(
      'users.get',
      {
        fields: 'photo_50'
      }
    );
  }

  public getSmpInfo(): Observable<IVKResponseGroups> {
    return this.request(
      'groups.getById',
      {
        group_id: environment.smp.ownerId,
        fields: 'description,status'
      }
    );
  }

  public request(method: string, params?: Object): Observable<any> {
    let subject = new Subject<any>(),
      requestParams = Object.assign((params || {}), { v: environment.vk.apiVersion }),
      callback = data => {
        this._ngZone.run(() => {
          subject.next(data)
        });
      };

    if (this._status !== 'loaded') {
      this.getLoginStatus(() => {
        this._sdk.Api.call(method, requestParams, callback);
      });
      return subject;
    }

    this._sdk.Api.call(method, requestParams, callback);
    return subject;
  }

  public login(): void {
    this._sdk.Auth.login(
      () => {
        this.getLoginStatus();
      },
      environment.vk.scope
    );
  }

  public logout(): void {
    this._sdk.Auth.logout(
      () => {
        this.getLoginStatus();
      }
    );
  }

  public isLogin(): boolean {
    return this._status === 'connected';
  }

  public getLoginStatus(callback?: Function): void {
    this._checkLoaded((vk: IVK) => {
      vk.Auth.getLoginStatus((res: any) => {
        this._ngZone.run(() => {
          this.status.emit(
            this._status = res[ 'status' ]
          );
          callback && callback(res);
        });
      });
    });
  }

  private _checkLoaded(callback: Function): void {
    let vk = window[ 'VK' ];

    if (vk) {
      callback(vk);
      return;
    }

    setTimeout(() => {
      this._checkLoaded(callback);
    }, 250);
  }

  private static _insertVkSDK(sdkUrl: string): void {
    let node = document.createElement('script');
    node.src = sdkUrl;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[ 0 ].appendChild(node);
  }

}
