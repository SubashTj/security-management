import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInCreateComponent } from './stock-in-create.component';

describe('StockInCreateComponent', () => {
  let component: StockInCreateComponent;
  let fixture: ComponentFixture<StockInCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockInCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockInCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
