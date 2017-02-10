import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-snippet-request',
  templateUrl: './snippet-request.component.html',
  styleUrls: [ './snippet-request.component.css' ]
})
export class SnippetRequestComponent implements OnInit {

  @Input()
  public data: IPostItem;

  constructor() {
  }

  ngOnInit() {
  }

}
