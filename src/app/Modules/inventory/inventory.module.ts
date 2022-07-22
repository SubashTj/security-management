import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockCreateComponent } from './stock-create/stock-create.component';
import { StockUpdateComponent } from './stock-update/stock-update.component';
import { StockInComponent } from './stock-in/stock-in.component';
import { StockInCreateComponent } from './stock-in-create/stock-in-create.component';
import { StockInUpdateComponent } from './stock-in-update/stock-in-update.component';
import { StockOutComponent } from './stock-out/stock-out.component';
import { StockOutCreateComponent } from './stock-out-create/stock-out-create.component';
import { StockOutUpdateComponent } from './stock-out-update/stock-out-update.component';
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
import { MatTimepickerModule } from 'mat-timepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [StockListComponent, StockCreateComponent, StockUpdateComponent, StockInComponent, StockInCreateComponent, StockInUpdateComponent, StockOutComponent, StockOutCreateComponent, StockOutUpdateComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
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
  ]
})
export class InventoryModule { }
