import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Input()
    public menu: IMenuItem[];

    @Output()
    public onSwitchMenuItem: EventEmitter<IMenuItem> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    public onSelectMenuItem(item: IMenuItem){
        this.onSwitchMenuItem.emit(item);
    }

}
