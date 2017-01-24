import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-section-posts',
  templateUrl: './section-posts.component.html',
  styleUrls: [ './section-posts.component.css' ]
})
export class SectionPostsComponent implements OnInit {

  public showRequests: boolean;

  public showReports: boolean;

  public constructor(private _activatedRoute: ActivatedRoute) {
    _activatedRoute.data
      .subscribe(({ showRequests = false, showReports = false }) => {
        this.showRequests = showRequests;
        this.showReports = showReports;
      })
  }

  public ngOnInit() {
    console.log(
      this.showRequests,
      this.showReports
    );
  }

}
