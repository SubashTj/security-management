import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceTimeCreateComponent } from './attendance-time-create.component';

describe('AttendanceTimeCreateComponent', () => {
  let component: AttendanceTimeCreateComponent;
  let fixture: ComponentFixture<AttendanceTimeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceTimeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceTimeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
