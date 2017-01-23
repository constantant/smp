import { Routes } from "@angular/router";
import { SectionIndexComponent } from "../section-index/section-index.component";
import { SectionRequestsComponent } from "../section-requests/section-requests.component";
import { SectionReportsComponent } from "../section-reports/section-reports.component";
import { SectionNopageComponent } from "../section-nopage/section-nopage.component";

export const rootRoutes: Routes = [
  {
    path: '',
    component: SectionIndexComponent
  },
  {
    path: 'requests',
    component: SectionRequestsComponent,
  },
  {
    path: 'reports',
    component: SectionReportsComponent,
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
