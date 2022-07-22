import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryUpdateComponent } from './salary-update.component';

describe('SalaryUpdateComponent', () => {
  let component: SalaryUpdateComponent;
  let fixture: ComponentFixture<SalaryUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
