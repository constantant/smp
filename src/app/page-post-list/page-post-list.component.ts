import {Component, OnInit, Input, NgZone} from '@angular/core';
import {DataService} from "../service/data.service";
import {URLSearchParams} from "@angular/http";
import {environment} from '../../environments/environment';
import {ModelWindowService} from "../service/model-window.service";

@Component({
    selector: 'app-page-post-list',
    templateUrl: './page-post-list.component.html',
    styleUrls: ['./page-post-list.component.css']
})
export class PagePostListComponent implements OnInit {

    public list: IPostItem[];

    public count: number;

    constructor(private _dataService: DataService,
                private _zone: NgZone,
                public modelWindowService: ModelWindowService) {
    }

    public onCreateNewPost() {
        this.modelWindowService.showModalCreateNewForm = true;
    }

    public isLogin(){
        return this._dataService.isLogin();
    }

    ngOnInit() {
        this._dataService
            .getPostsByHash(environment.smp.tagPost)
            .subscribe(({response:{items, count}}) => {
                this._zone.run(() => {
                    this.count = count;
                    this.list = items.map(({id, created_by, date, geo, text, attachments}) => {
                        return {
                            id,
                            created_by,
                            date: new Date(date * 1000),
                            geo,
                            text,
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
}
