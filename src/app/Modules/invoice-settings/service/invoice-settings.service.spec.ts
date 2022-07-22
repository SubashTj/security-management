import { TestBed } from '@angular/core/testing';

import { InvoiceSettingsService } from './invoice-settings.service';

describe('InvoiceSettingsService', () => {
  let service: InvoiceSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
