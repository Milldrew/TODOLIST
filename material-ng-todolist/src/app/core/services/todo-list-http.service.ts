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
      todos: [
        { name: 'work', isFinished: false },
        { name: 'work', isFinished: false },
        { name: 'work', isFinished: false },
      ],
    },
    {
      id: 2,
      name: '2name',
      todos: [{ name: 'work', isFinished: false }],
    },
    {
      id: 3,
      name: '3name',
      todos: [{ name: 'work', isFinished: false }],
    },
  ];
}
