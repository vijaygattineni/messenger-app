import { TestBed, inject } from '@angular/core/testing';

import { QBService } from './qb.service';

describe('QBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QBService]
    });
  });

  it('should be created', inject([QBService], (service: QBService) => {
    expect(service).toBeTruthy();
  }));
});
