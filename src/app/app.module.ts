import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { VkService, PostService, DbService, UserService, AppService } from './services';
import { rootRoutes } from './routers';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SectionNopageComponent } from './section-nopage/section-nopage.component';
import { RouteReuseStrategy, RouterModule } from "@angular/router";
import { SectionPostsComponent } from './section-posts/section-posts.component';
import { SnippetRequestComponent } from './section-posts/snippet-request/snippet-request.component';
import { SnippetReportComponent } from './section-posts/snippet-report/snippet-report.component';
import { AppReuseStrategy } from "./routers/reuse-strategy";

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
    AppService,
    PostService,
    { provide: RouteReuseStrategy, useClass: AppReuseStrategy }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
