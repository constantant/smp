import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-page-report-item',
    templateUrl: './page-report-item.component.html',
    styleUrls: ['./page-report-item.component.css']
})
export class PageReportItemComponent implements OnInit {

    @Input()
    public data: IReportItem;

    constructor() {
    }

    ngOnInit() {
    }

}
