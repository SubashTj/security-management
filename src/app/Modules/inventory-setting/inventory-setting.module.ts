import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventorySettingRoutingModule } from './inventory-setting-routing.module';
import { InventoryTypeComponent } from './inventory-type/inventory-type.component';
import { UnitTypeComponent } from './unit-type/unit-type.component';
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
import { InventoryTypeCreateComponent } from './inventory-type-create/inventory-type-create.component';
import { InventoryTypeUpdateComponent } from './inventory-type-update/inventory-type-update.component';
import { UnittypeCreateComponent } from './unittype-create/unittype-create.component';
import { UnittypeUpdateComponent } from './unittype-update/unittype-update.component';

@NgModule({
  declarations: [InventoryTypeComponent, UnitTypeComponent, InventoryTypeCreateComponent, InventoryTypeUpdateComponent, UnittypeCreateComponent, UnittypeUpdateComponent],
  imports: [
    CommonModule,
    InventorySettingRoutingModule,
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
export class InventorySettingModule { }
