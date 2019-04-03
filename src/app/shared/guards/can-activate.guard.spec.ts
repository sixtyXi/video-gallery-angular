import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CanActivateGuard } from './can-activate.guard';

describe('CanActivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ CanActivateGuard ]
    });
  });

  it(
    'should ...',
    inject([ CanActivateGuard ], (guard: CanActivateGuard) => {
      expect(guard).toBeTruthy();
    })
  );
});
