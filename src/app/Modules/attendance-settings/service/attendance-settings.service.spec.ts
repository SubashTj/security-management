import { TestBed } from '@angular/core/testing';

import { AttendanceSettingsService } from './attendance-settings.service';

describe('AttendanceSettingsService', () => {
  let service: AttendanceSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
