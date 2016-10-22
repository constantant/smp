import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-page-post-item',
  templateUrl: './page-post-item.component.html',
  styleUrls: ['./page-post-item.component.css']
})
export class PagePostItemComponent implements OnInit {

  @Input()
  public data: IPostItem;

  constructor() { }

  ngOnInit() {
  }

}
