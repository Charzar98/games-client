import { TestBed } from '@angular/core/testing';

import { ExternalRequestsService } from './external-requests.service';

describe('ExternalRequestsServiceService', () => {
  let service: ExternalRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
