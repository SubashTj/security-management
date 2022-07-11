import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftTimeRoutingModule } from './shift-time-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [ListComponent, CreateComponent],
  imports: [
    CommonModule,
    ShiftTimeRoutingModule
  ]
})
export class ShiftTimeModule { }
