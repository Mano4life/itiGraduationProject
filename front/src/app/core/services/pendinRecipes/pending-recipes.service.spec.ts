import { TestBed } from '@angular/core/testing';

import { PendingRecipesService } from './pending-recipes.service';

describe('PendingRecipesService', () => {
  let service: PendingRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
