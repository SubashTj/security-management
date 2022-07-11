import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualattendanceCreateComponent } from './manualattendance-create.component';

describe('ManualattendanceCreateComponent', () => {
  let component: ManualattendanceCreateComponent;
  let fixture: ComponentFixture<ManualattendanceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualattendanceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualattendanceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
