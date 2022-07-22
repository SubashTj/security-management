import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineTrackingComponent } from './timeline-tracking.component';

describe('TimelineTrackingComponent', () => {
  let component: TimelineTrackingComponent;
  let fixture: ComponentFixture<TimelineTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
