import { TestBed } from '@angular/core/testing';

import { QuidditchService } from './quidditch.service';

describe('QuidditchService', () => {
  let service: QuidditchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuidditchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
