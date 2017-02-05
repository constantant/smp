import { Injectable } from '@angular/core';
import { VkService } from "./vk.service";
import { ReplaySubject } from "rxjs/ReplaySubject";

@Injectable()
export class UserService {

  public userInfo: ReplaySubject<IVKUser> = new ReplaySubject<IVKUser>();

  constructor(private _vkService: VkService) {
    _vkService
      .getUserInfo()
      .subscribe(({ response }) => {
        this.userInfo.next(response[ 0 ]);
      })
  }

}
