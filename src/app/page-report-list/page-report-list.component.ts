import {Component} from '@angular/core';
import {environment} from '../../environments/environment';
import {List} from "../shared";
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-page-report-list',
    templateUrl: './page-report-list.component.html',
    styleUrls: ['./page-report-list.component.css']
})
export class PageReportListComponent extends List{
    protected getListObservable(): Observable<any> {
        return this._dataService.getPostsByHash(environment.smp.tagReport);
    }
}
