import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceSettingsRoutingModule } from './attendance-settings-routing.module';
import { ListComponent } from './shift-assign/list/list.component';
import { CreateComponent } from './shift-assign/create/create.component';
import { ListDetailComponent } from './shift-details/list-detail/list-detail.component';
import { CreateDetailComponent } from './shift-details/create-detail/create-detail.component';
import { UpdateDetailComponent } from './shift-details/update-detail/update-detail.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatTimepickerModule } from 'mat-timepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { UpdateAssignComponent } from './shift-assign/update-assign/update-assign.component';
import { AttendanceTimeComponent } from './attendance-time/attendance-time.component';
import { AttendanceTimeCreateComponent } from './attendance-time-create/attendance-time-create.component';
import { AttendanceTimeUpdateComponent } from './attendance-time-update/attendance-time-update.component';
@NgModule({
  declarations: [ListComponent, CreateComponent, ListDetailComponent, CreateDetailComponent,UpdateDetailComponent, UpdateAssignComponent, AttendanceTimeComponent, AttendanceTimeCreateComponent, AttendanceTimeUpdateComponent],
  imports: [
    CommonModule,
    AttendanceSettingsRoutingModule,
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
    MatTimepickerModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatSortModule,
    NgxMaterialTimepickerModule


  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AttendanceSettingsModule { }
