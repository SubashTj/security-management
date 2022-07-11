import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingRoutingModule } from './tracking-routing.module';
import { LiveTrackingComponent } from './live-tracking/live-tracking.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MglTimelineModule } from 'angular-mgl-timeline';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LocationTrackingComponent } from './location-tracking/location-tracking.component';
import { TimelineTrackingComponent } from './timeline-tracking/timeline-tracking.component';
import { InfrastructureComponent } from './infrastructure/infrastructure.component';
import { NgxVerticalTimelineModule } from 'ngx-vertical-timeline';
import {MatStepperModule} from '@angular/material/stepper';
@NgModule({
  declarations: [LiveTrackingComponent, LocationTrackingComponent, TimelineTrackingComponent, InfrastructureComponent],
  imports: [
    CommonModule,
    TrackingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    MglTimelineModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
    MatDatepickerModule,
    NgxVerticalTimelineModule,
    MatStepperModule

  
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TrackingModule { }
