import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssignComponent } from './employee-assign.component';

describe('EmployeeAssignComponent', () => {
  let component: EmployeeAssignComponent;
  let fixture: ComponentFixture<EmployeeAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
