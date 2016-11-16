import {environment} from '../environments/environment';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {OAuthService} from 'angular2-oauth2/oauth-service';

import {AgmCoreModule} from 'angular2-google-maps/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {MenuComponent} from './menu/menu.component';
import {AuthComponent} from './auth/auth.component';
import {PagePostListComponent} from './page-post-list/page-post-list.component';
import {PagePostItemComponent} from './page-post-item/page-post-item.component';
import {PageReportListComponent} from './page-report-list/page-report-list.component';
import {PageReportItemComponent} from './page-report-item/page-report-item.component';
import {SearchComponent} from './search/search.component';
import {PageSettingsComponent} from './page-settings/page-settings.component';
import {DataService, ModelWindowService} from './service';
import {appRoutes} from './app.routes';
import {IndexComponent} from './index/index.component';
import {NopageComponent} from './nopage/nopage.component';
import {ModalWindowComponent} from './modal-window/modal-window.component';
import { FormCreateNewPostComponent } from './form-create-new-post/form-create-new-post.component';

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
        PageSettingsComponent,
        IndexComponent,
        NopageComponent,
        ModalWindowComponent,
        FormCreateNewPostComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        AgmCoreModule.forRoot({
            apiKey: environment.googleMapsKey
        }),
        RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    providers: [
        DataService,
        ModelWindowService,
        OAuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
