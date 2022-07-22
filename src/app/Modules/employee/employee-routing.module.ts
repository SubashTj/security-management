import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { GeneralattendanceComponent } from './generalattendance/generalattendance.component';
import { ListLeaveComponent } from './leave-request/list-leave/list-leave.component';
import { ListComponent } from './list/list.component';
import { ManualattendanceCreateComponent } from './manualattendance-create/manualattendance-create.component';
import { ManualattendanceComponent } from './manualattendance/manualattendance.component';
import { OfficeAttendanceComponent } from './office-attendance/office-attendance.component';
import { TimeattendanceComponent } from './timeattendance/timeattendance.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListComponent,
        data: { title: 'List of Employee', breadcrumb: 'List' }
      },
      {
        path: 'view/:id',
        component: ViewEmployeeComponent,
        data: { title: 'View of Employee', breadcrumb: 'View' }
      },
      {
        path: 'create',
        component: CreateComponent,
        data: { title: 'Create Employee', breadcrumb: 'New' }
      },
      {
        path: 'update-employee/:id',
        component: UpdateEmployeeComponent,
        data: { title: 'Edit Employee', breadcrumb: 'Update' }
      },
      {
        path: 'generalattendance',
        component: GeneralattendanceComponent,
        data: { title: 'General Attendance', breadcrumb: 'General Attendance' }
      },
      {
        path: 'office-attendance',
        component: OfficeAttendanceComponent,
        data: { title: 'List of Office Attendance', breadcrumb: 'Office Attendance' }
      },
      {
        path: 'manualattendance',
        component: ManualattendanceComponent,
        data: { title: 'List of Manual Attendance', breadcrumb: 'Manual Attendance' }
      },
      {
        path: 'timeattendance',
        component: TimeattendanceComponent,
        data: { title: 'List of Time and Attendance', breadcrumb: 'Time and Attendance' }
      },
      {
        path: 'leave-request/list-leave',
        component: ListLeaveComponent,
        data: { title: 'List of Leave Request', breadcrumb: 'Leave Request / List' }

      },
      {
        path: 'manualattendance-create/:districtId',
        component: ManualattendanceCreateComponent,
        data: { title: 'Manual Attendance', breadcrumb: 'Manual Attendance' }

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
// /:this.customerId/:this.districtId/:this.departmentId/:this.positionId'