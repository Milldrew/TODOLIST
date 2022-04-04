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

  removeTodolist(id: number) {
    const todolistIndex = this.todolists.findIndex(
      (todolist) => todolist.id === id
    );
    if (todolistIndex < 0) {
      console.error('todlist: ID' + id + "doesn't exist");
    }
    this.todolists.splice(todolistIndex, 1);
  }
  addTodoList() {
    this.todolists.push({
      authorId: 1,
      id: 1,
      name: 'New Todo List',
      todos: [{ name: 'new todo', isFinished: false }],
    });

    return of(this.todolists);
  }
}
