import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { serviceProvider } from './service/service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [serviceProvider]
})
export class CoreModule { }
