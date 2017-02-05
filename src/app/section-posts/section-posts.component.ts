import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PostService, EPostType } from "../services/post.service";

@Component({
  selector: 'app-section-posts',
  templateUrl: './section-posts.component.html',
  styleUrls: [ './section-posts.component.css' ]
})
export class SectionPostsComponent implements OnInit {

  public showRequests: boolean;

  public showReports: boolean;

  public list: IPostItem[];

  public constructor(private _activatedRoute: ActivatedRoute,
                     private _postService: PostService) {
    _activatedRoute.data
      .subscribe(({ showRequests = false, showReports = false }) => {
        this.showRequests = showRequests;
        this.showReports = showReports;
      })
  }

  public ngOnInit() {
    let type;

    if (this.showRequests && !this.showReports) {
      type = EPostType.Request
    }

    if (!this.showRequests && this.showReports) {
      type = EPostType.Report
    }

    this
      ._postService
      .getList(type)
      .subscribe((list: IPostItem[]) => {
        this.list = list;
      });
  }

}
