import {Component, NgZone} from '@angular/core';
import {List} from "../shared";
import {Observable} from 'rxjs/Observable';
import {environment} from "../../environments/environment";
import {DataService} from "../service/data.service";
import {ModalWindowService} from "../service/model-window.service";
import {IndexedDB} from "../service/indexed-db.service";


@Component({
    selector: 'app-page-post-list',
    templateUrl: './page-post-list.component.html',
    styleUrls: ['./page-post-list.component.css']
})
export class PagePostListComponent extends List {
    constructor(protected _dataService: DataService,
                protected _db: IndexedDB,
                protected _zone: NgZone,
                public modelWindowService: ModalWindowService) {
        super(_dataService, _db, _zone, modelWindowService);
    }

    protected getListObservable(): Observable<any> {
        return this._dataService.getPostsByHash(environment.smp.tagPost);
    }
}
