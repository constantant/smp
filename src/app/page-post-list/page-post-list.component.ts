import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-page-post-list',
    templateUrl: './page-post-list.component.html',
    styleUrls: ['./page-post-list.component.css']
})
export class PagePostListComponent implements OnInit {

    @Input()
    public list: IMenuItem[];

    constructor() {
    }

    ngOnInit() {
    }

}
