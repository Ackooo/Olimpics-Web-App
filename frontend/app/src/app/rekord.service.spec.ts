import { TestBed } from '@angular/core/testing';

import { RekordService } from './rekord.service';

describe('RekordService', () => {
  let service: RekordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RekordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
