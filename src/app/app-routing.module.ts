import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {UniversityComponent} from "./university/university.component";
import {ProfileComponent} from "./profile/profile.component";
import {UniversityListComponent} from "./university-list/university-list.component";
import {GroupListComponent} from "./group-list/group-list.component";
import {GroupComponent} from "./group/group.component";
import {MyHomeworkComponent} from "./my-homework/my-homework.component";
import {InstituteComponent} from "./institute/institute.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "profile", component: ProfileComponent},
  {path: "university", component: UniversityListComponent},
  {path: "university/:id", component: UniversityComponent},
  {path: "team", component: GroupListComponent},
  {path: "team/:id", component: GroupComponent},
  {path: "my-homework", component: MyHomeworkComponent},
  {path: "institute/:id", component: InstituteComponent},
  // {path: '', redirectTo: '/university', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
