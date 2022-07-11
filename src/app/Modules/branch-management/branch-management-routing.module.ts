import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchListComponent } from './branch-list/branch-list.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {

        path:'list',
        component:BranchListComponent,
        data: { title: "District List", breadcrumb: "District List" }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchManagementRoutingModule { }
