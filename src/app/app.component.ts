import { Component } from '@angular/core';
import { VkService } from "./services/vk.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  public currentClass = 'current';
}
