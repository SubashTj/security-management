import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQualificationComponent } from './update-qualification.component';

describe('UpdateQualificationComponent', () => {
  let component: UpdateQualificationComponent;
  let fixture: ComponentFixture<UpdateQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
