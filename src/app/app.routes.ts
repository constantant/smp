import {Routes} from '@angular/router'
import {IndexComponent} from './index/index.component';
import {NopageComponent} from './nopage/nopage.component';
import {PagePostListComponent} from './page-post-list/page-post-list.component';
import {PageReportListComponent} from './page-report-list/page-report-list.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: IndexComponent
    },
    {
        path: 'posts',
        component: PagePostListComponent,
    },
    {
        path: 'reports',
        component: PageReportListComponent,
    },
    {
        path: 'access_token',
        redirectTo: ''
    },
    {
        path: '**',
        component: NopageComponent
    }
];