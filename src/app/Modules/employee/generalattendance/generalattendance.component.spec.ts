import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralattendanceComponent } from './generalattendance.component';

describe('GeneralattendanceComponent', () => {
  let component: GeneralattendanceComponent;
  let fixture: ComponentFixture<GeneralattendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralattendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
