import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenseListComponent } from './license-list/license-list.component';


const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'license-list',
      component: LicenseListComponent,
      data: { title: 'License-Remainder', breadcrumb: 'License-Remainder' }
    }]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseRemainderRoutingModule { }
