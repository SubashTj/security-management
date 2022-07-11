import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfrastructureComponent } from './infrastructure/infrastructure.component';
import { LiveTrackingComponent } from './live-tracking/live-tracking.component';
import { LocationTrackingComponent } from './location-tracking/location-tracking.component';
import { TimelineTrackingComponent } from './timeline-tracking/timeline-tracking.component';


const routes: Routes = [
  {
    path:'live-tracking',
    component:LiveTrackingComponent,
    data: { title: 'Live Tracking', breadcrumb: 'Live Tracking' }
  },
  {
    path:'location-tracking',
    component:LocationTrackingComponent,
    data: { title: 'Location Tracking', breadcrumb: 'Location Tracking' }
  },
  {
    path:'timeline-tracking',
    component:TimelineTrackingComponent,
    data: { title: 'Timeline Tracking', breadcrumb: 'Timeline Tracking' }
  },
  {
    path:'infrastructure',
    component:InfrastructureComponent,
    data: { title: 'Infrastructure', breadcrumb: 'Infrastructure' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule { }
