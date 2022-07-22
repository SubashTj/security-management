import { TestBed } from '@angular/core/testing';

import { PaymentRemainderService } from './payment-remainder.service';

describe('PaymentRemainderService', () => {
  let service: PaymentRemainderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentRemainderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
