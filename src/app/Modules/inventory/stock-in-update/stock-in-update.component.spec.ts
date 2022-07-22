import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInUpdateComponent } from './stock-in-update.component';

describe('StockInUpdateComponent', () => {
  let component: StockInUpdateComponent;
  let fixture: ComponentFixture<StockInUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockInUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockInUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
