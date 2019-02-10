import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CanActivateGuard } from './can-activate.guard';

describe('CanActivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
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
