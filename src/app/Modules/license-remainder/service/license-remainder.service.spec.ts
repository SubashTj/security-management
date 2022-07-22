import { TestBed } from '@angular/core/testing';

import { LicenseRemainderService } from './license-remainder.service';

describe('LicenseRemainderService', () => {
  let service: LicenseRemainderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicenseRemainderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
