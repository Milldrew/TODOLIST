import { TestBed } from '@angular/core/testing';

import { TodolistsStoreService } from './todolists-store.service';

describe('TodolistsStoreService', () => {
  let service: TodolistsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodolistsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
