import { Component, Input, OnInit } from '@angular/core';
import { EPostType } from "../../services/post.service";

@Component({
  selector: 'app-snippet-report',
  templateUrl: './snippet-report.component.html',
  styleUrls: [ './snippet-report.component.css' ]
})
export class SnippetReportComponent implements OnInit {

  @Input()
  public data: IPostItem;

  constructor() {
  }

  ngOnInit() {
  }

}
