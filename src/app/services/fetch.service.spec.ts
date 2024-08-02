import { TestBed } from '@angular/core/testing';

import { FetchService } from './services/fetch.service';

describe('FetchService', () => {
  let service: FetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
