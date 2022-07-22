import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseRemainderRoutingModule } from './license-remainder-routing.module';
import { LicenseListComponent } from './license-list/license-list.component';
import { LicenseCreateComponent } from './license-create/license-create.component';
import { LicenseUpdateComponent } from './license-update/license-update.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [LicenseListComponent, LicenseCreateComponent, LicenseUpdateComponent],
  imports: [
    CommonModule,
    LicenseRemainderRoutingModule,
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
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule
  ]
})
export class LicenseRemainderModule { }
