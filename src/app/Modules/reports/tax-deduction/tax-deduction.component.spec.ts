import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxDeductionComponent } from './tax-deduction.component';

describe('TaxDeductionComponent', () => {
  let component: TaxDeductionComponent;
  let fixture: ComponentFixture<TaxDeductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxDeductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
