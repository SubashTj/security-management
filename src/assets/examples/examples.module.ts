import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ResponsiveSidenavComponent } from './responsive-sidenav/responsive-sidenav.component';
import { SharedComponentModule } from 'src/app/shared/shared-component/shared-component.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list'; 
@NgModule({
  declarations: [ResponsiveSidenavComponent],
  imports: [
    CommonModule,
    ExamplesRoutingModule,
    SharedComponentModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule

  ]
})
export class ExamplesModule { }
