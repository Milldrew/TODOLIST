import { Injectable } from '@angular/core';
import { TodoList } from '../models/todo-list';

@Injectable({
  providedIn: 'root',
})
export class TodoListHttpService {
  constructor() {}

  mockTodolists: TodoList[] = [
    {
      id: 1,
      name: 'name',
      todos: [{ name: 'work', isFinished: false }],
    },
    {
      id: 1,
      name: 'name',
      todos: [{ name: 'work', isFinished: false }],
    },
    {
      id: 1,
      name: 'name',
      todos: [{ name: 'work', isFinished: false }],
    },
  ];
}
