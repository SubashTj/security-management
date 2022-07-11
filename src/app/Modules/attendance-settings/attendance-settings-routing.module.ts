import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceTimeCreateComponent } from './attendance-time-create/attendance-time-create.component';
import { AttendanceTimeComponent } from './attendance-time/attendance-time.component';
import { ListComponent } from './shift-assign/list/list.component';
import { ListDetailComponent } from './shift-details/list-detail/list-detail.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'shift-details/list-detail',
        component:ListDetailComponent,
        data: { title: 'List of Shift Details', breadcrumb: 'Shift Details / List' }
      },
      {
        path:'shift-assign/list',
        component:ListComponent,
        data: { title: 'List of Shift Assign', breadcrumb: 'Shift Assign / List' }
      },
      {
        path:'attendance-time',
        component:AttendanceTimeComponent,
        data: { title: 'List of Attendance Time', breadcrumb: 'List' }
      },
      {
        path:'attendance-time-create',
        component:AttendanceTimeCreateComponent,
        data: { title: 'Create Attendance Time', breadcrumb: 'Create' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceSettingsRoutingModule { }
