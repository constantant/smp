import { Component, OnInit } from '@angular/core';
import { VkService } from "../services/vk.service";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.css' ]
})
export class AuthComponent implements OnInit {

  public isLogin: boolean = false;

  public userInfo: IVKUser;

  public constructor(private _vkService: VkService,
                     private _userService: UserService) {
    _vkService
      .status
      .subscribe(() => {
        this.isLogin = _vkService.isLogin();
      });

    _userService
      .userInfo
      .subscribe((info: IVKUser) => {
        this.userInfo = info;
      });
  }

  public loguot() {
    if (!confirm('Are you sure?')) {
      return;
    }

    this._vkService.logout();
  }

  public login() {
    this._vkService.login();
  }

  public ngOnInit() {
  }

}
