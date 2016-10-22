import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-page-report-list',
    templateUrl: './page-report-list.component.html',
    styleUrls: ['./page-report-list.component.css']
})
export class PageReportListComponent implements OnInit {

    @Input()
    public list: IMenuItem[];

    constructor() {
    }

    ngOnInit() {
    }

}
