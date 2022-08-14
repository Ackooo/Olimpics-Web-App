import { TestBed } from '@angular/core/testing';

import { UcesnikService } from './ucesnik.service';

describe('UcesnikService', () => {
  let service: UcesnikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UcesnikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
