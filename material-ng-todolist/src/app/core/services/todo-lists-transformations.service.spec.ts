import { TestBed } from '@angular/core/testing';

import { TodoListsTransformationsService } from './todo-lists-transformations.service';

describe('TodoListsTransformationsService', () => {
  let service: TodoListsTransformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoListsTransformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
