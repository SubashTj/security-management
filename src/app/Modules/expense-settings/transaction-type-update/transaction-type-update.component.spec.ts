import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTypeUpdateComponent } from './transaction-type-update.component';

describe('TransactionTypeUpdateComponent', () => {
  let component: TransactionTypeUpdateComponent;
  let fixture: ComponentFixture<TransactionTypeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionTypeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
