import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PostService, EPostType } from "../services/post.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import "rxjs/add/operator/debounceTime";

@Component({
  selector: 'app-section-posts',
  templateUrl: './section-posts.component.html',
  styleUrls: [ './section-posts.component.css' ]
})
export class SectionPostsComponent implements OnInit {

  public showRequests: boolean;

  public showReports: boolean;

  public numberOfNewPosts: number = 0;

  public form: FormGroup;

  public list: IPostItem[];

  public EPostType = EPostType;

  public constructor(private _activatedRoute: ActivatedRoute,
                     private _fb: FormBuilder,
                     private _postService: PostService) {

    _postService.onNewPosts
      .subscribe((ids: number[]) => {
        if (!(this.list && this.list.length)) {
          this.updateList();
          return;
        }

        this.numberOfNewPosts += ids.length;
      });

    _activatedRoute.data
      .subscribe(({ showRequests = false, showReports = false }) => {
        this.showRequests = showRequests;
        this.showReports = showReports;
      });

    this.form = _fb.group({
      filter: [ '' ]
    });

    this.form.controls[ 'filter' ]
      .valueChanges
      .debounceTime(200)
      .subscribe((value: string) => {
        this.updateList({
          text: value
        });
      })
  }

  public ngOnInit() {
    this.updateList();
  }

  showNewPosts() {
    this.numberOfNewPosts = 0;
    this.updateList();
  }

  updateList(options?: any) {
    let type;

    if (this.showRequests && !this.showReports) {
      type = EPostType.Request
    }

    if (!this.showRequests && this.showReports) {
      type = EPostType.Report
    }

    this
      ._postService
      .getList(type, null, options)
      .subscribe((list: IPostItem[]) => {
        this.list = list;
      });
  }

}
