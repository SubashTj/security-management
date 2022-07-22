import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEmployeComponent } from './assign-employe.component';

describe('AssignEmployeComponent', () => {
  let component: AssignEmployeComponent;
  let fixture: ComponentFixture<AssignEmployeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
