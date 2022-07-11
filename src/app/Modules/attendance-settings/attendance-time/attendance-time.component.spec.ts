import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceTimeComponent } from './attendance-time.component';

describe('AttendanceTimeComponent', () => {
  let component: AttendanceTimeComponent;
  let fixture: ComponentFixture<AttendanceTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
