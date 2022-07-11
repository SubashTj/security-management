import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationUpdateComponent } from './quotation-update.component';

describe('QuotationUpdateComponent', () => {
  let component: QuotationUpdateComponent;
  let fixture: ComponentFixture<QuotationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
