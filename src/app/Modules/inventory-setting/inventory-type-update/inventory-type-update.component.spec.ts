import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTypeUpdateComponent } from './inventory-type-update.component';

describe('InventoryTypeUpdateComponent', () => {
  let component: InventoryTypeUpdateComponent;
  let fixture: ComponentFixture<InventoryTypeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryTypeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
