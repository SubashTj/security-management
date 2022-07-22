import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoMomentComponent } from './no-moment/no-moment.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PerformanceComponent } from './performance/performance.component';
import { NgxPrintModule } from 'ngx-print';
import { FileUploadModule } from 'ng2-file-upload';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EmployeeAssignComponent } from './employee-assign/employee-assign.component';
import { SalaryReportComponent } from './salary-report/salary-report.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadCreateComponent } from './file-upload-create/file-upload-create.component';
import { InvoiceReportComponent } from './invoice-report/invoice-report.component';
import { EsiEpfComponent } from './esi-epf/esi-epf.component';
import { TaxDeductionComponent } from './tax-deduction/tax-deduction.component';
import { LoginandlogoutComponent } from './loginandlogout/loginandlogout.component';
import { PrintoutComponent } from './printout/printout.component';
import { AdvanceSalaryComponent } from './advance-salary/advance-salary.component';
import { TrashComponent } from './trash/trash.component';
import { OutStaffComponent } from './out-staff/out-staff.component';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [EmployeeReportComponent, NoMomentComponent, PerformanceComponent, EmployeeAssignComponent, SalaryReportComponent, FileUploadComponent, FileUploadCreateComponent, InvoiceReportComponent, EsiEpfComponent, TaxDeductionComponent, LoginandlogoutComponent, PrintoutComponent, AdvanceSalaryComponent, TrashComponent, OutStaffComponent, InvoiceComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxPrintModule,
    FileUploadModule,
    PdfViewerModule
  ]
})
export class ReportsModule { }
