import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UniversityComponent } from './university/university.component';
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import {PrimeNGConfig} from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    UniversityComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    RouterModule.forRoot([
      {path: "university", component: UniversityComponent},
      {path: '', redirectTo: '/university', pathMatch: 'full'},
    ]), ButtonModule, RippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
