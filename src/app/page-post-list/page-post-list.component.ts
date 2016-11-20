import {Component, NgZone} from '@angular/core';
import {List} from "../shared";
import {Observable} from 'rxjs/Observable';
import {environment} from "../../environments/environment";
import {DataService} from "../service/data.service";
import {ModelWindowService} from "../service/model-window.service";


@Component({
    selector: 'app-page-post-list',
    templateUrl: './page-post-list.component.html',
    styleUrls: ['./page-post-list.component.css']
})
export class PagePostListComponent extends List {
    constructor(protected _dataService: DataService,
                protected _zone: NgZone,
                public modelWindowService: ModelWindowService) {
        super(_dataService, _zone, modelWindowService);
    }

    protected getListObservable(): Observable<any> {
        return this._dataService.getPostsByHash(environment.smp.tagPost);
    }
}
