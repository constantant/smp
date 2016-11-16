import {Component, OnInit, Input} from '@angular/core';
import {DataService} from "../service/data.service";
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-page-report-list',
    templateUrl: './page-report-list.component.html',
    styleUrls: ['./page-report-list.component.css']
})
export class PageReportListComponent implements OnInit {

    public list: IReportItem[];

    public count: number;

    constructor(private _dataService: DataService) {
    }

    ngOnInit() {
        this._dataService
            .getPostsByHash(environment.smp.tagReport)
            .subscribe(({response:{items, count}}) => {
                this.count = count;
                this.list = items.map(({text, attachments}) => {
                    return {
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
    }

}
