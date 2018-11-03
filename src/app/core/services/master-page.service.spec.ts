import { TestBed, inject } from '@angular/core/testing';

import { MasterPageService } from './master-page.service';

describe('MasterPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MasterPageService]
    });
  });

  it('should be created', inject([MasterPageService], (service: MasterPageService) => {
    expect(service).toBeTruthy();
  }));
});
