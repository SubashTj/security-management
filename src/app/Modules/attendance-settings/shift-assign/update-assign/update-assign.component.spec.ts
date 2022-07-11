import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssignComponent } from './update-assign.component';

describe('UpdateAssignComponent', () => {
  let component: UpdateAssignComponent;
  let fixture: ComponentFixture<UpdateAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
