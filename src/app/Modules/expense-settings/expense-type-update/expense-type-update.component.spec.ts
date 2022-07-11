import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTypeUpdateComponent } from './expense-type-update.component';

describe('ExpenseTypeUpdateComponent', () => {
  let component: ExpenseTypeUpdateComponent;
  let fixture: ComponentFixture<ExpenseTypeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseTypeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
