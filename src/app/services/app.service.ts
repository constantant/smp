import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class AppService {

  public showToTop: boolean;

  public onGoToTop: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

}
