import { Component } from '@angular/core';
import { VkService } from "./services/vk.service";
import { AppService } from "./services/app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  public currentClass = 'current';

  constructor(public appService: AppService) {
  }

  goToTop() {
    this.appService.onGoToTop.emit();
  }
}
