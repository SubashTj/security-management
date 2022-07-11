import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvanceSalaryComponent } from './advance-salary/advance-salary.component';
import { EmployeeAssignComponent } from './employee-assign/employee-assign.component';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
import { EsiEpfComponent } from './esi-epf/esi-epf.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { InvoiceReportComponent } from './invoice-report/invoice-report.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LoginandlogoutComponent } from './loginandlogout/loginandlogout.component';
import { NoMomentComponent } from './no-moment/no-moment.component';
import { OutStaffComponent } from './out-staff/out-staff.component';
import { PerformanceComponent } from './performance/performance.component';
import { PrintoutComponent } from './printout/printout.component';
import { SalaryReportComponent } from './salary-report/salary-report.component';
import { TaxDeductionComponent } from './tax-deduction/tax-deduction.component';
import { TrashComponent } from './trash/trash.component';


const routes: Routes = [
  {
    path:'',
    children:[{
      path:'employee-report',
      component:EmployeeReportComponent,
      data: { title: 'Restricted Area', breadcrumb: 'Restricted Area' }
    }]
  },
  {
    path:'',
    children:[{
      path:'file-upload',
      component:FileUploadComponent,
      data: { title: 'File Upload', breadcrumb: 'File Upload' }
    }]
  },
  {
    path:'',
    children:[{
      path:'esi-epf',
      component:EsiEpfComponent,
      data: { title: 'ESI & EPF', breadcrumb: 'ESI & EPF Report' }
    }]
  },
  {
    path:'',
    children:[{
      path:'tax-deduction',
      component:TaxDeductionComponent,
      data: { title: 'TAX & DEDUCTION', breadcrumb: 'TAX & DEDUCTION Report' }
    }]
  },
  {
    path:'',
    children:[{
      path:'employee-assign',
      component:EmployeeAssignComponent,
      data: { title: 'Employee Assign', breadcrumb: 'Employee Assign' }
    }]
  },
  {
    path:'',
    children:[{
      path:'invoice-report',
      component:InvoiceReportComponent,
      data: { title: 'Invoice Generation', breadcrumb: 'Invoice Generation' }
    }]
  },
  {
    path:'',
    children:[{
      path:'invoice',
      component:InvoiceComponent,
      data: { title: 'Invoice-Report', breadcrumb: 'Invoice-Report' }
    }]
  },
  {
    path:'',
    children:[{
      path:'employee-nomovement',
      component:NoMomentComponent,
      data: { title: 'No Movement', breadcrumb: 'No Movement' }
    }]
  },
  {
    path:'',
    children:[{
      path:'employee-performance',
      component:PerformanceComponent,
      data: { title: 'Performance', breadcrumb: 'Performance' }
    }]
  },
  {
    path:'',
    children:[{
      path:'salary-report',
      component:SalaryReportComponent,
      data: { title: 'Salary-Report', breadcrumb: 'Salary-Report' }
    }]
  },
  {
    path:'',
    children:[{
      path:'outstaff-report',
      component:OutStaffComponent,
      data: { title: 'Salary-Report', breadcrumb: 'Salary-Report' }
    }]
  },
  {
    path:'',
    children:[{
      path:'loginandlogout',
      component:LoginandlogoutComponent,
      data: { title: 'Login And Logout History', breadcrumb: 'Login And Logout History' }
    }]
  },
  {
    path:'',
    children:[{
      path:'printout',
      component:PrintoutComponent,
      data: { title: 'Printout History', breadcrumb: 'Printout History' }
    }]
  },
  {
    path:'',
    children:[{
      path:'advance-salary',
      component:AdvanceSalaryComponent,
      data: { title: 'Advance-Salary Report', breadcrumb: 'Advance-Salary Report' }
    }]
  },
  {
    path:'',
    children:[{
      path:'trash',
      component:TrashComponent,
      data: { title: 'Trash Report', breadcrumb: 'Trash Report' }
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
