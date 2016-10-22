import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    @Input()
    public menu: IMenuItem[];

    @Output()
    public onSelectItem: EventEmitter<IMenuItem> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    public onClick(item: IMenuItem) {
        this.onSelectItem.emit(item);
    }

}
