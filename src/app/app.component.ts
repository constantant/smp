import { Component } from '@angular/core';
import { PostService } from "./services/post.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  title = 'app works!';

  list = [];

  constructor(private _postService: PostService) {
    _postService
      .getList()
      .subscribe((data: any) => {
        console.log(data);
        this.list = data[ 'response' ][ 'items' ];
      })
  }
}
