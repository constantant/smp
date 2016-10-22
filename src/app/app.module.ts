import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {MenuComponent} from './menu/menu.component';
import {AuthComponent} from './auth/auth.component';
import {PagePostListComponent} from './page-post-list/page-post-list.component';
import {PagePostItemComponent} from './page-post-item/page-post-item.component';
import {PageReportListComponent} from './page-report-list/page-report-list.component';
import {PageReportItemComponent} from './page-report-item/page-report-item.component';
import {SearchComponent} from './search/search.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MenuComponent,
        AuthComponent,
        PagePostListComponent,
        PagePostItemComponent,
        PageReportListComponent,
        PageReportItemComponent,
        SearchComponent,
        PageSettingsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
