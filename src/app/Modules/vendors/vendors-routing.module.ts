import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorListComponent } from './vendor-list/vendor-list.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'vendor-list',
        component:VendorListComponent,
        data: { title: 'List of Vendor', breadcrumb: 'Vendor-List' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorsRoutingModule { }
