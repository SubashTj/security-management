import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    data: { title: "Default", breadcrumb: "DashBoard" }
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    data: { title: "Default", breadcrumb: "DashBoard" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
