import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchManagementRoutingModule } from './branch-management-routing.module';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchCreateComponent } from './branch-create/branch-create.component';
import { BranchUpdateComponent } from './branch-update/branch-update.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [BranchListComponent, BranchCreateComponent, BranchUpdateComponent],
  imports: [
    CommonModule,
    BranchManagementRoutingModule,
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
export class BranchManagementModule { }
