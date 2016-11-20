import {Component, NgZone} from '@angular/core';
import {List} from "../shared";
import {DataService} from "../service/data.service";
import {ModelWindowService} from "../service/model-window.service";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent extends List {
    constructor(protected _dataService: DataService,
                protected _zone: NgZone,
                public modelWindowService: ModelWindowService) {
        super(_dataService, _zone, modelWindowService);
    }
}
