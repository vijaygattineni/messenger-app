import { TestBed, inject } from '@angular/core/testing';

import { LoginAccountService } from './login-account.service';

describe('LoginAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginAccountService]
    });
  });

  it('should be created', inject([LoginAccountService], (service: LoginAccountService) => {
    expect(service).toBeTruthy();
  }));
});
