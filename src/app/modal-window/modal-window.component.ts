import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-modal-window',
    templateUrl: './modal-window.component.html',
    styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {

    @Output()
    public close: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    public onClose(event: Event) {
        this.close.emit(event);
    }

    ngOnInit() {
    }

}
