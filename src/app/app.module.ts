import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { VkService, PostService } from './services';
import { rootRoutes } from './routers';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SectionIndexComponent } from './section-index/section-index.component';
import { SectionRequestsComponent } from './section-requests/section-requests.component';
import { SectionReportsComponent } from './section-reports/section-reports.component';
import { SectionNopageComponent } from './section-nopage/section-nopage.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SectionIndexComponent,
    SectionRequestsComponent,
    SectionReportsComponent,
    SectionNopageComponent
  ],
  imports: [
    RouterModule.forRoot(rootRoutes, { useHash: true }),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    VkService,
    PostService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
