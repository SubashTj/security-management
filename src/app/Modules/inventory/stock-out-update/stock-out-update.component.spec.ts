import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockOutUpdateComponent } from './stock-out-update.component';

describe('StockOutUpdateComponent', () => {
  let component: StockOutUpdateComponent;
  let fixture: ComponentFixture<StockOutUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockOutUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockOutUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
