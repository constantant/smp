import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PostService, EPostType } from "../services/post.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";
import { AppService } from "../services/app.service";

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

  public list: IPostItem[] = [];

  public EPostType = EPostType;

  @ViewChild('elementList')
  public elementList: ElementRef;

  @ViewChild('wrapper')
  public wrapper: ElementRef;

  private _options: any = {};

  private _scrollTop: number = 0;

  private _scrollSubject: Subject<Event> = new Subject();

  public constructor(private _activatedRoute: ActivatedRoute,
                     private _fb: FormBuilder,
                     private _appService: AppService,
                     private _postService: PostService) {

    _appService.onGoToTop
      .subscribe(() => {
        this.scrollToTop();
      });

    _postService.onNewPosts
      .subscribe((ids: number[]) => {
        if (!(this.list && this.list.length)) {
          this.updateList(this._options);
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
        this._options.text = value;
        this.updateList(this._options);
      });

    this._scrollSubject
      .debounceTime(100)
      .subscribe((event: Event) => {
        let element = this.elementList.nativeElement,
          wrapper = this.wrapper.nativeElement,
          elementRect = element.getBoundingClientRect(),
          wrapperRect = wrapper.getBoundingClientRect(),
          top = element.scrollTop;

        if (top === 0) {
          return;
        }

        this._scrollTop = top;

        if (Math.floor(top + elementRect.height) === Math.floor(+wrapperRect.height)) {
          let lastIndex = this.list.length - 1;
          this.updateList(this._options, this.list[ lastIndex ].timestamp, true);
        }
      });
  }

  public ngOnInit() {
    this.updateList(this._options);
  }

  showNewPosts() {
    this.numberOfNewPosts = 0;
    this.updateList(this._options);
  }

  updateList(options?: any, timestamp?: number, pages?: boolean) {
    let type;

    if (this.showRequests && !this.showReports) {
      type = EPostType.Request
    }

    if (!this.showRequests && this.showReports) {
      type = EPostType.Report
    }

    this
      ._postService
      .getList(type, timestamp, options)
      .subscribe((list: IPostItem[]) => {
        if (pages) {
          if (list && list.length) {
            this.list.push(...list);
          }
          return;
        }
        this.list = list;
      });
  }

  onScroll(event: Event) {
    this._scrollSubject.next(event);
  }

  scrollToTop() {
    let list = this.elementList.nativeElement,
      top = list.scrollTop;

    list.scrollTop = top === 0 ? this._scrollTop : 0;
  }

}
