import {Component, OnInit} from '@angular/core';
import {DataService} from '../service';
import {URLSearchParams} from "@angular/http";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    public userData: IUserInfo;

    constructor(private _dataService: DataService) {
        this._dataService
            .getUserInfo()
            .subscribe(data => {
                this.userData = data.response[0];
            });
    }

    public login() {
        this._dataService.login();
    }

    public logout() {
        this._dataService.logout();
    }

    public isLogin(): boolean {
        return this._dataService.isLogin();
    }

    ngOnInit() {
    }
}
