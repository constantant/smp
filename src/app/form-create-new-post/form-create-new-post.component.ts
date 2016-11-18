import {Component, OnInit} from '@angular/core';
import {DataService} from "../service/data.service";
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import 'rxjs/add/operator/debounce';

@Component({
    selector: 'app-form-create-new-post',
    templateUrl: './form-create-new-post.component.html',
    styleUrls: ['./form-create-new-post.component.css']
})
export class FormCreateNewPostComponent implements OnInit {

    public form: FormGroup;

    constructor(private _dataService: DataService,
                private _fb: FormBuilder) {
        this.form = _fb.group({
            date: [''],
            comment: ['']
        });
    }

    public onSubmit(value) {
        console.log(value);

        /*this._dataService
         .createPost(value.comment)
         .subscribe(response=>console.log(response));*/
    }

    ngOnInit() {
    }

}
