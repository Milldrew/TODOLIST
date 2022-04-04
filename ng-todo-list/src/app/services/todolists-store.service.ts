import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Todolist } from '../models/todolist';

@Injectable({
  providedIn: 'root',
})
export class TodolistsStoreService {
  todolists: Todolist[] = [
    {
      authorId: 1,
      id: 1,
      name: 'Program',
      todos: [{ name: 'bar', isFinished: false }],
    },
    {
      authorId: 1,
      id: 1,
      name: 'Read programing book',
      todos: [{ name: 'bar', isFinished: false }],
    },
    {
      authorId: 1,
      id: 1,
      name: 'Listen to programing',
      todos: [{ name: 'bar', isFinished: false }],
    },
    {
      authorId: 1,
      id: 1,
      name: 'Complete Software Project',
      todos: [{ name: 'bar', isFinished: false }],
    },
  ];

  constructor() {}

  getTodoLists() {
    return of(this.todolists);
  }
}
