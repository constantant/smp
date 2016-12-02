import {OnInit, NgZone} from '@angular/core';
import {environment} from "../../environments/environment";
import {DataService} from "../service/data.service";
import {Observable} from 'rxjs/Observable';
import {ModalWindowService} from "../service/model-window.service";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {IndexedDB} from "../service/indexed-db.service";

export class List implements OnInit {

    public list: IPostItem[];

    public count: number;

    constructor(protected _dataService: DataService,
                protected _db: IndexedDB,
                protected _zone: NgZone,
                public modelWindowService: ModalWindowService) {

    }

    public onCreateNewPost() {
        this.modelWindowService.showModalCreateNewForm = true;
    }

    public isLogin() {
        return this._dataService.isLogin();
    }

    public ngOnInit() {
        let subjectItems = new ReplaySubject<IPostItem[]>(),
            subjectCount = new ReplaySubject<number>(),
            rePost = new RegExp(`#${environment.smp.tagPost}$`),
            reReport = new RegExp(`#${environment.smp.tagReport}$`);

        subjectItems.subscribe(items => {
            this._zone.run(() => {
                this.list = items;
            });
        });

        subjectCount.subscribe(count => {
            this._zone.run(() => {
                this.count = count;
            });
        });

        this.getListObservable()
            .subscribe(({response:{items, count, profiles}}) => {
                subjectCount.next(count);
                profiles.every(({id, first_name, last_name, has_photo, crop_photo:{photo:{photo_75}}}) => {
                    let user = {
                        id, first_name, last_name, has_photo, photo_75
                    };
                    this._db
                        .addData(environment.db.storeUsers, user)
                        .subscribe(data => console.log(data));

                    return user;
                });
                subjectItems.next(items.map(({id, from_id, date, geo, text, attachments}) => {
                    let isPost = rePost.test(text),
                        isReport = reReport.test(text),
                        _eventDate = Date.parse(text.replace(/^When:\s(\d{4}-\d{2}-\d{2})(\s(.*))+/, '$1')),
                        _text = text.replace(/^(.*)\sAbout:\s(.*)/, '$2'),
                        _type = 'other';

                    if (isPost) {
                        _text = _text.replace(rePost, '');
                        _type = 'post';
                    }

                    if (isReport) {
                        _text = _text.replace(reReport, '');
                        _type = 'report';
                    }

                    _text = _text.replace('\n', '<br/>');

                    let item = {
                        type: _type,
                        isPost: isPost,
                        isReport: isReport,
                        id,
                        from_id,
                        date: new Date(date * 1000),
                        dateEvent: isNaN(_eventDate) ? false : _eventDate.toString(),
                        geo,
                        text: _text,
                        images: attachments ? attachments
                            .filter(({type}) => type === 'photo')
                            .map(({photo: {photo_75, photo_130, photo_604}}) => {
                                return {
                                    photo_75,
                                    photo_130,
                                    photo_604
                                }
                            }) : []
                    };

                    this._db
                        .addData(environment.db.storeList, item)
                        .subscribe(data => console.log(data));

                    return item;
                }));
            });
    }

    protected getListObservable(): Observable<any> {
        return this._dataService.getAll();
    }
}
