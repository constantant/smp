import {Component} from '@angular/core';
import {List} from "../shared";
import {Observable} from 'rxjs/Observable';
import {environment} from "../../environments/environment";


@Component({
    selector: 'app-page-post-list',
    templateUrl: './page-post-list.component.html',
    styleUrls: ['./page-post-list.component.css']
})
export class PagePostListComponent extends List{
    protected getListObservable(): Observable<any> {
        return this._dataService.getPostsByHash(environment.smp.tagPost);
    }
}
