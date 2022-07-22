import { TestBed } from '@angular/core/testing';

import { InventorySettingService } from './inventory-setting.service';

describe('InventorySettingService', () => {
  let service: InventorySettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventorySettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
