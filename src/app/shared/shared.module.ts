import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentModule } from './shared-component/shared-component.module';
import { SharedDirectivesModule } from './directives/shared-directives.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedComponentModule,
    SharedDirectivesModule
    
  ]
})
export class SharedModule { }
