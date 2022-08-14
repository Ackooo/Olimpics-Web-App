import { TestBed } from '@angular/core/testing';

import { EkipaService } from './ekipa.service';

describe('EkipaService', () => {
  let service: EkipaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EkipaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
