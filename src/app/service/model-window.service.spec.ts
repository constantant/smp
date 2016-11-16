/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModelWindowService } from './model-window.service';

describe('Service: ModelWindow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelWindowService]
    });
  });

  it('should ...', inject([ModelWindowService], (service: ModelWindowService) => {
    expect(service).toBeTruthy();
  }));
});
