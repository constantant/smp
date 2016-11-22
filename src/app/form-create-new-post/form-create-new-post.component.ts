import {Component, OnInit, NgZone} from '@angular/core';
import {DataService} from "../service/data.service";
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import 'rxjs/add/operator/debounce';
import {ModelWindowService} from "../service/model-window.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-form-create-new-post',
    templateUrl: './form-create-new-post.component.html',
    styleUrls: ['./form-create-new-post.component.css']
})
export class FormCreateNewPostComponent implements OnInit {

    public form: FormGroup;

    public options: Object = {
        url: '',
        autoUpload: false
    };

    constructor(private _dataService: DataService,
                private _fb: FormBuilder,
                private _router: Router,
                private _zone: NgZone,
                public modelWindowService: ModelWindowService) {
        this.form = _fb.group({
            date: [''],
            comment: [''],
            files: ['']
        });

        this._dataService
            .apiRequest('photos.getWallUploadServer')
            .subscribe(data => {
                this._zone.run(() => {
                    console.log(data);
                    this.options['url'] = data['response']['upload_url'];
                });
            })
    }

    public handleMultipleUpload(event) {
        console.log(event);
    }

    public onSubmit(value) {
        console.log(value);
        this._dataService
            .createPost(value.comment, value.date)
            .subscribe(response => {
                this._zone.run(() => {
                    this.modelWindowService.showModalCreateNewForm = false;
                    this._router.navigateByUrl('/');
                });
            });
    }

    ngOnInit() {
    }

}
