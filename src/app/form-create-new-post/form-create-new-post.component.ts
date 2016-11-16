import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-form-create-new-post',
    templateUrl: './form-create-new-post.component.html',
    styleUrls: ['./form-create-new-post.component.css']
})
export class FormCreateNewPostComponent implements OnInit {

    constructor() {
    }

    public onSubmit(value) {
        console.log(value);
    }

    ngOnInit() {
    }

}
