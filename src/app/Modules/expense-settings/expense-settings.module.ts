import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseSettingsRoutingModule } from './expense-settings-routing.module';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';
import { ExpenseTypeCreateComponent } from './expense-type-create/expense-type-create.component';
import { ExpenseTypeUpdateComponent } from './expense-type-update/expense-type-update.component';
import { TransactionTypeComponent } from './transaction-type/transaction-type.component';
import { TransactionTypeCreateComponent } from './transaction-type-create/transaction-type-create.component';
import { TransactionTypeUpdateComponent } from './transaction-type-update/transaction-type-update.component';
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
  declarations: [ExpenseTypeComponent, ExpenseTypeCreateComponent, ExpenseTypeUpdateComponent, TransactionTypeComponent, TransactionTypeCreateComponent, TransactionTypeUpdateComponent],
  imports: [
    CommonModule,
    ExpenseSettingsRoutingModule,
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
export class ExpenseSettingsModule { }
