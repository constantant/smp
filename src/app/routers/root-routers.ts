import { Routes } from "@angular/router";
import { SectionNopageComponent } from "../section-nopage/section-nopage.component";
import { SectionPostsComponent } from "../section-posts/section-posts.component";

export const rootRoutes: Routes = [
  {
    path: '',
    component: SectionPostsComponent,
    data: {
      showRequests: true,
      showReports: true
    }
  },
  {
    path: 'requests',
    component: SectionPostsComponent,
    data: {
      showRequests: true
    }
  },
  {
    path: 'reports',
    component: SectionPostsComponent,
    data: {
      showReports: true
    }
  },
  {
    path: 'access_token',
    redirectTo: ''
  },
  {
    path: '**',
    component: SectionNopageComponent
  }
];
