import { TestBed } from '@angular/core/testing';

import { SelectedItem } from './selected-item';

describe('SelectedItem', () => {
  let service: SelectedItem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedItem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
