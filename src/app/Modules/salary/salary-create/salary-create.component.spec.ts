import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryCreateComponent } from './salary-create.component';

describe('SalaryCreateComponent', () => {
  let component: SalaryCreateComponent;
  let fixture: ComponentFixture<SalaryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
