import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutStaffComponent } from './out-staff.component';

describe('OutStaffComponent', () => {
  let component: OutStaffComponent;
  let fixture: ComponentFixture<OutStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
