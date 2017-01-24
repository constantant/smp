import { Injectable } from '@angular/core';
import { VkService } from "./vk.service";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment";

@Injectable()
export class PostService {

  public constructor(private _vkService: VkService) {
  }

  private _pullData(offset?: number, count?: number): Observable<any> {
    return this._vkService.request('wall.get', {
      offset: offset || 0,
      extended: 1,
      fields: 'crop_photo,has_photo',
      owner_id: '-' + environment.smp.ownerId,
      count: count || environment.smp.count
    });
  }

}
