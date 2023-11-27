import { TestBed } from '@angular/core/testing';

import { DataVillasService } from './data-villas.service';

describe('DataVillasService', () => {
  let service: DataVillasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataVillasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
