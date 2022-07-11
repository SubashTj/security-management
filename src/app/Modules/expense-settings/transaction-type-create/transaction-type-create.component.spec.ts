import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTypeCreateComponent } from './transaction-type-create.component';

describe('TransactionTypeCreateComponent', () => {
  let component: TransactionTypeCreateComponent;
  let fixture: ComponentFixture<TransactionTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
