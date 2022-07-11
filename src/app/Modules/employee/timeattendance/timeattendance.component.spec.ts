import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeattendanceComponent } from './timeattendance.component';

describe('TimeattendanceComponent', () => {
  let component: TimeattendanceComponent;
  let fixture: ComponentFixture<TimeattendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeattendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
