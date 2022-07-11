import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceTimeUpdateComponent } from './attendance-time-update.component';

describe('AttendanceTimeUpdateComponent', () => {
  let component: AttendanceTimeUpdateComponent;
  let fixture: ComponentFixture<AttendanceTimeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceTimeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceTimeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
