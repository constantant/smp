/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModalWindowService } from './model-window.service';

describe('Service: ModelWindow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalWindowService]
    });
  });

  it('should ...', inject([ModalWindowService], (service: ModalWindowService) => {
    expect(service).toBeTruthy();
  }));
});
