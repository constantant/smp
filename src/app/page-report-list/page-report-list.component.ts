import {Component, NgZone} from '@angular/core';
import {environment} from '../../environments/environment';
import {List} from "../shared";
import {Observable} from 'rxjs/Observable';
import {DataService} from "../service/data.service";
import {ModelWindowService} from "../service/model-window.service";

@Component({
    selector: 'app-page-report-list',
    templateUrl: './page-report-list.component.html',
    styleUrls: ['./page-report-list.component.css']
})
export class PageReportListComponent extends List {
    constructor(protected _dataService: DataService,
                protected _zone: NgZone,
                public modelWindowService: ModelWindowService) {
        super(_dataService, _zone, modelWindowService);
    }

    protected getListObservable(): Observable<any> {
        return this._dataService.getPostsByHash(environment.smp.tagReport);
    }
}
