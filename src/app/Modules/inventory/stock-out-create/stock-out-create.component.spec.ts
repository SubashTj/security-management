import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockOutCreateComponent } from './stock-out-create.component';

describe('StockOutCreateComponent', () => {
  let component: StockOutCreateComponent;
  let fixture: ComponentFixture<StockOutCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockOutCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockOutCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
