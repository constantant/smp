import {Component, NgZone} from '@angular/core';
import {List} from "../shared";
import {DataService} from "../service/data.service";
import {ModalWindowService} from "../service/model-window.service";
import {IndexedDB} from "../service/indexed-db.service";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent extends List {
    constructor(protected _dataService: DataService,
                protected _db: IndexedDB,
                protected _zone: NgZone,
                public modelWindowService: ModalWindowService) {
        super(_dataService, _db, _zone, modelWindowService);
    }
}
