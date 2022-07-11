import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutSettingsRoutingModule } from './layout-settings-routing.module';
import { ListDetailsComponent } from './layout_category/list-details/list-details.component';
import { ListComponent } from './layout_position/list/list.component';
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
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateComponent } from './layout_category/create/create.component';
import { UpdateComponent } from './layout_category/update/update.component';
import { CreatePositionComponent } from './layout_position/create-position/create-position.component';
import { UpdatePositionComponent } from './layout_position/update-position/update-position.component';
import { RuleListComponent } from './layout_ruleengine/rule-list/rule-list.component';
import { RuleCreateComponent } from './layout_ruleengine/rule-create/rule-create.component';
import { RuleUpdateComponent } from './layout_ruleengine/rule-update/rule-update.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {AccordionModule} from 'primeng/accordion';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
  declarations: [ListDetailsComponent, ListComponent, CreateComponent, UpdateComponent, CreatePositionComponent, UpdatePositionComponent, RuleListComponent, RuleCreateComponent, RuleUpdateComponent],
  imports: [
    CommonModule,
    LayoutSettingsRoutingModule,
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
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule,
    NgMultiSelectDropDownModule,
    AccordionModule,
    MultiSelectModule,
 

  ],

})
export class LayoutSettingsModule { }
