import { Injectable } from '@angular/core';
import { VkService } from "./vk.service";
import { DbService } from "./db.service";
import Dexie from "dexie";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/of";
import "rxjs/add/operator/switchMap";
import { environment } from "../../environments/environment";

@Injectable()
export class PostService {

  public constructor(private _vkService: VkService,
                     private _dbService: DbService) {
  }

  public getList(type?: number) {
    let subject: Subject<IPostItem[]> = new Subject();
    this
      ._getPostsFromDB(Date.now(), type)
      .switchMap((data: IPostItem[]) => {
        if (!data.length) {
          return this._addNewListToDB()
            .switchMap(() => {
              return this.getList(type);
            });
        }

        return Observable.of(data);
      })
      .subscribe((data: IPostItem[]) => {
        subject.next(data);
      });
    return subject;
  }

  private _addNewListToDB(): Observable<number[]> {
    let db = this._dbService;
    return Observable.fromPromise(
      db.transaction(
        'r',
        db.posts,
        () => db.posts.count()
      ))
      .switchMap((count: number) => this._pullData(count))
      .switchMap((data: IVKResponseWall) => Observable.fromPromise(
        db.transaction(
          'rw',
          db.posts,
          () => Dexie.Promise
            .all(data.response.items.map(
              ({ id, text, date, from_id }) => {
                let info = PostService._getPostInfoByText(text);
                return db.posts.add({
                  id,
                  type: info.type,
                  timestamp: date * 1000,
                  from_id,
                  text: info.text
                })
              }
            ))
        ))
      );
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

  private _getPostsFromDB(timestamp: number, type?: number) {
    let db = this._dbService;
    return Observable.fromPromise(
      db.transaction(
        'r',
        db.posts,
        () => db.posts
          .where('timestamp')
          .below(timestamp)
          .and((value: IPostItem) => type ? value.type === type : true)
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

}

export enum EPostType {
  Other = 0,
  Request = 1,
  Report = 2
}
