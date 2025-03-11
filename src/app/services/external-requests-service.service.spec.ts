import { TestBed } from '@angular/core/testing';

import { ExternalRequestsServiceService } from './external-requests-service.service';

describe('ExternalRequestsServiceService', () => {
  let service: ExternalRequestsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalRequestsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
