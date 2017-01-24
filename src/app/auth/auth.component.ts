import { Component, OnInit } from '@angular/core';
import { VkService } from "../services/vk.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.css' ]
})
export class AuthComponent implements OnInit {

  public isLogin: boolean = false;

  public constructor(private _vkService: VkService) {
    _vkService
      .status
      .subscribe(() => {
        this.isLogin = _vkService.isLogin();
      });
  }

  public loguot() {
    this._vkService.logout();
  }

  public login() {
    this._vkService.login();
  }

  public ngOnInit() {
  }

}
