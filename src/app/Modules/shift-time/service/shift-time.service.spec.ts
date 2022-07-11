import { TestBed } from '@angular/core/testing';

import { ShiftTimeService } from './shift-time.service';

describe('ShiftTimeService', () => {
  let service: ShiftTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
