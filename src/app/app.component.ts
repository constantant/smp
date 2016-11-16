import {Component} from '@angular/core';
import {ModelWindowService} from "./service/model-window.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(
        public modelWindowService: ModelWindowService
    ) {
    }

    public onClose() {
        this.modelWindowService.showModalCreateNewForm = false;
    }

    public isShown(){
        return (
            this.modelWindowService.showModalCreateNewForm
        );
    }
}
