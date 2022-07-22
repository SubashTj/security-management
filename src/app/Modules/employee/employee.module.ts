import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from "@angular/material/divider";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralattendanceComponent } from './generalattendance/generalattendance.component';
import { ManualattendanceComponent } from './manualattendance/manualattendance.component';
import { TimeattendanceComponent } from './timeattendance/timeattendance.component';
import { ListLeaveComponent } from './leave-request/list-leave/list-leave.component';
import { MatNativeDateModule } from '@angular/material/core';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { ManualattendanceCreateComponent } from './manualattendance-create/manualattendance-create.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxPrintModule } from 'ngx-print';
import { AssignClientComponent } from './assign-client/assign-client.component';
import { OfficeAttendanceComponent } from './office-attendance/office-attendance.component';
import { AdvanceSalaryComponent } from './advance-salary/advance-salary.component';
@NgModule({
  declarations: [CreateComponent, ListComponent, GeneralattendanceComponent, ManualattendanceComponent, TimeattendanceComponent, ListLeaveComponent, UpdateEmployeeComponent, ViewEmployeeComponent, ManualattendanceCreateComponent, AssignClientComponent, OfficeAttendanceComponent, AdvanceSalaryComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    NgxMaterialTimepickerModule,
    NgxPrintModule


  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeeModule { }
