import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTypeCreateComponent } from './inventory-type-create.component';

describe('InventoryTypeCreateComponent', () => {
  let component: InventoryTypeCreateComponent;
  let fixture: ComponentFixture<InventoryTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
