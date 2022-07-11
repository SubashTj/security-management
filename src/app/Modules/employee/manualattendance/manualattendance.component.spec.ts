import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualattendanceComponent } from './manualattendance.component';

describe('ManualattendanceComponent', () => {
  let component: ManualattendanceComponent;
  let fixture: ComponentFixture<ManualattendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualattendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
