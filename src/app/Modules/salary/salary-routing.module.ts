import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalaryListComponent } from './salary-list/salary-list.component';


const routes: Routes = [
  {
  
    path:'',
    component:SalaryListComponent,
    data: { title: "Salary", breadcrumb: "Salary List" }
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryRoutingModule { }
