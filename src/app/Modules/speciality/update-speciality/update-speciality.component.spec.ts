import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpecialityComponent } from './update-speciality.component';

describe('UpdateSpecialityComponent', () => {
  let component: UpdateSpecialityComponent;
  let fixture: ComponentFixture<UpdateSpecialityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSpecialityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
