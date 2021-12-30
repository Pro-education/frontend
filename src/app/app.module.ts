import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {UniversityComponent} from './university/university.component';
import {LoginComponent} from './login/login.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {PrimeNGConfig} from "primeng/api";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { CardModule } from 'primeng/card';
import { ProfileComponent } from './profile/profile.component';
import {AuthInterceptor} from "./_helpers/auth.interceptor";
import { UniversityListComponent } from './university-list/university-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import {TimelineModule} from "primeng/timeline";
import { GroupListComponent } from './group-list/group-list.component';
import { GroupComponent } from './group/group.component';
import { MyHomeworkComponent } from './my-homework/my-homework.component';
import { InstituteComponent } from './institute/institute.component';


@NgModule({
  declarations: [
    AppComponent,
    UniversityComponent,
    LoginComponent,
    ProfileComponent,
    UniversityListComponent,
    GroupListComponent,
    GroupComponent,
    MyHomeworkComponent,
    InstituteComponent
  ],
  imports: [
    CardModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    HttpClientModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TimelineModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  exports: [BsDropdownModule, TooltipModule, ModalModule]
})
export class AppModule {
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
