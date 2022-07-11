import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeAttendanceComponent } from './office-attendance.component';

describe('OfficeAttendanceComponent', () => {
  let component: OfficeAttendanceComponent;
  let fixture: ComponentFixture<OfficeAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
