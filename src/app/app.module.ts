import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { VkService, PostService, DbService, UserService } from './services';
import { rootRoutes } from './routers';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SectionNopageComponent } from './section-nopage/section-nopage.component';
import { RouterModule } from "@angular/router";
import { SectionPostsComponent } from './section-posts/section-posts.component';
import { SnippetRequestComponent } from './section-posts/snippet-request/snippet-request.component';
import { SnippetReportComponent } from './section-posts/snippet-report/snippet-report.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SectionNopageComponent,
    SectionPostsComponent,
    SnippetRequestComponent,
    SnippetReportComponent
  ],
  imports: [
    RouterModule.forRoot(rootRoutes, { useHash: true }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    VkService,
    UserService,
    DbService,
    PostService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
