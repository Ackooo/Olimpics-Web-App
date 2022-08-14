import { TestBed } from '@angular/core/testing';

import { TakmicenjeService } from './takmicenje.service';

describe('TakmicenjeService', () => {
  let service: TakmicenjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TakmicenjeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
