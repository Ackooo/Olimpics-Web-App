import { TestBed } from '@angular/core/testing';

import { ZemljaService } from './zemlja.service';

describe('ZemljaService', () => {
  let service: ZemljaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZemljaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
