import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    })
  );

  it('should be created', () => {
    const service: CoursesService = TestBed.get(CoursesService);
    expect(service).toBeTruthy();
  });
});
