import { Injectable } from '@angular/core';
import { TodoList } from '../models/todo-list';
import { TodoListHttpService } from './todo-list-http.service';

@Injectable({
  providedIn: 'root',
})
export class TodoListsTransformationsService {
  constructor(private readonly todoListHttp: TodoListHttpService) {}

  getTodoList(id: number): TodoList | null {
    console.log('get todo list');
    console.log(id);
    console.log(typeof id);
    const result = this.todoListHttp.lists.find(
      (list: TodoList) => list.id === id
    );
    if (result) {
      return result;
    }
    return null;
  }
}
