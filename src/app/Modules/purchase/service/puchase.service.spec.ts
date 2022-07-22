import { TestBed } from '@angular/core/testing';

import { PuchaseService } from './puchase.service';

describe('PuchaseService', () => {
  let service: PuchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
