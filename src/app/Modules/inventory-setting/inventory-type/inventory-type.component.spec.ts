import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTypeComponent } from './inventory-type.component';

describe('InventoryTypeComponent', () => {
  let component: InventoryTypeComponent;
  let fixture: ComponentFixture<InventoryTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
