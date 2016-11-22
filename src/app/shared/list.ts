import {OnInit, NgZone} from '@angular/core';
import {environment} from "../../environments/environment";
import {DataService} from "../service/data.service";
import {Observable} from 'rxjs/Observable';
import {ModelWindowService} from "../service/model-window.service";

export class List implements OnInit {

    public list: IPostItem[];

    public count: number;

    constructor(protected _dataService: DataService,
                protected _zone: NgZone,
                public modelWindowService: ModelWindowService) {

    }

    public onCreateNewPost() {
        this.modelWindowService.showModalCreateNewForm = true;
    }

    public isLogin() {
        return this._dataService.isLogin();
    }

    public ngOnInit() {
        let rePost = new RegExp(`#${environment.smp.tagPost}$`),
            reReport = new RegExp(`#${environment.smp.tagReport}$`);

        this.getListObservable()
            .subscribe(({response:{items, count}}) => {
                this._zone.run(() => {
                    this.count = count;
                    this.list = items.map(({id, created_by, date, geo, text, attachments}) => {
                        let isPost = rePost.test(text),
                            isReport = reReport.test(text),
                            _eventDate = Date.parse(text.replace(/^When:\s(\d{4}-\d{2}-\d{2})(\s(.*))+/, '$1')),
                            _text = text.replace(/^(.*)\sAbout:\s(.*)/, '$2');

                        if (isPost) {
                            _text = _text.replace(rePost, '');
                        }

                        if (isReport) {
                            _text = _text.replace(reReport, '');
                        }

                        _text = _text.replace('\n', '<br/>');

                        return {
                            isPost: isPost,
                            isReport: isReport,
                            id,
                            created_by,
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
                        }
                    });
                });
            });
    }

    protected getListObservable(): Observable<any> {
        return this._dataService.getAll();
    }
}
