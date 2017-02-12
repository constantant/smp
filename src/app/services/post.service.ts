import { EventEmitter, Injectable } from '@angular/core';
import { VkService } from "./vk.service";
import { DbService } from "./db.service";
import Dexie from "dexie";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/of";
import "rxjs/add/operator/switchMap";
import { environment } from "../../environments/environment";

@Injectable()
export class PostService {

  public onNewPosts: EventEmitter<number[]> = new EventEmitter();

  public constructor(private _vkService: VkService,
                     private _dbService: DbService) {
    this._checkNewPosts();
  }

  public getList(type?: number, timestamp?: number, options?: any): Observable<IPostItem[]> {
    return this._getPostsFromDB(timestamp || Date.now(), type, options);
  }

  public checkNewPosts(offset?: number, count?: number): Observable<any> {
    let db = this._dbService,
      observable = Observable
        .combineLatest(
          this._pullData(offset, count),
          Observable.fromPromise(
            db.transaction(
              'r',
              db.posts,
              () => db.posts
                .limit(environment.db.limit)
                .reverse()
                .sortBy('timestamp')
            ))
        );
    observable.subscribe(([ { response:{ items } }, dbItems ]) => {
      this._addToDBAfterCompare(items, dbItems, offset, count);
    });
    return observable;
  }

  private _addToDBAfterCompare(items: IVKPost[], dbItems: IPostItem[], offset?: number, count?: number) {
    let toAdd: IVKPost[] = [], k = 0;
    for (let i = 0; i < items.length; i++) {
      let item: IVKPost = items[ i ],
        dbItem: IPostItem = dbItems[ k ];

      if (dbItem && item.id === dbItem.id) {
        //todo maybe should update the post
        k++;
        continue;
      }

      toAdd.push(item);
    }

    this._insertToDB(toAdd).then(
      (ids: number[]) => {
        this.onNewPosts.emit(ids);
      }
    );

    if (k === 0) {
      this.checkNewPosts(offset, count);
    }
  }

  private _insertToDB(items: IVKPost[]): Dexie.Promise<number[]> {
    let db = this._dbService;
    return Dexie.Promise
      .all(items.map(
        (post: IVKPost) => {
          let { id, text, date, from_id, attachments } = post,
            info = PostService._getPostInfoByText(text);
          return this._dbAdd(db, {
            id,
            type: info.type,
            timestamp: date * 1000,
            from_id,
            text: info.text,
            attachments
          })
        }
      ))
  }

  private _dbAdd(db: DbService, data: IPostItem): Dexie.Promise<number> {
    return new Dexie.Promise((resolve, reject) => {
      db.posts.add(data)
        .then(
          resolve,
          (err: Dexie.DexieError) => {
            if (err.inner.code !== 0) {
              reject(err);
            }

            db.posts.update(data.id, data)
              .then(() => {
              }, reject)
          }
        );
    });
  }

  private _getPostsFromDB(timestamp: number, type?: number, options?: any): Observable<IPostItem[]> {
    let db = this._dbService;
    return Observable.fromPromise(
      db.transaction(
        'r',
        db.posts,
        () => db.posts
          .where('timestamp')
          .below(timestamp)
          .and((value: IPostItem) => {
            let typeIsAccess = type ? value.type === type : true,
              textIsAccess = true;
            if (options) {
              if (options.text) {
                textIsAccess = (new RegExp(`${options.text}`, 'i')).test(value.text);
              }
            }
            return typeIsAccess && textIsAccess;
          })
          .limit(environment.db.limit)
          .reverse()
          .sortBy('timestamp')
      )
    );
  }

  private _pullData(offset?: number, count?: number): Observable<IVKResponseWall> {
    return this._vkService.request(
      'wall.get',
      {
        offset: offset || 0,
        extended: 1,
        fields: 'crop_photo,has_photo',
        owner_id: '-' + environment.smp.ownerId,
        count: count || environment.smp.count
      }
    );
  }

  private _checkNewPosts() {
    this.checkNewPosts()
      .subscribe(() => {
        setTimeout(() => {
          this._checkNewPosts();
        }, environment.smp.pingDuration);
      });
  }

  private static _getPostInfoByText(text) {
    let reRequest = new RegExp(`#${environment.smp.tagPost}$`),
      reReport = new RegExp(`#${environment.smp.tagReport}$`),
      isRequest = reRequest.test(text),
      isReport = reReport.test(text),
      _eventDate = Date.parse(text.replace(/^When:\s(\d{4}-\d{2}-\d{2})(\s(.*))+/, '$1')),
      _text = text.replace(/^(.*)\sAbout:\s(.*)/, '$2'),
      _type = EPostType.Other;

    if (isRequest) {
      _text = _text.replace(reRequest, '');
      _type = EPostType.Request;
    }

    if (isReport) {
      _text = _text.replace(reReport, '');
      _type = EPostType.Report;
    }

    _text = _text.replace('\n', '<br/>');

    return {
      type: _type,
      text: _text,
      eventDate: _eventDate
    };
  }

}

export enum EPostType {
  Other = 0,
  Request = 1,
  Report = 2
}
