import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'list',
        component:ListComponent,
        data: { title: 'List of  Holiday Settings', breadcrumb: 'List' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidaySettingsRoutingModule { }
