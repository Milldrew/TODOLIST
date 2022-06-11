import { Injectable } from '@angular/core';
import { CreateUpdateTodoListDto } from '../models/create-update-todo-list.dto';
import { TodoList } from '../models/todo-list';
import { TodoListHttpService } from './todo-list-http.service';

@Injectable({
  providedIn: 'root',
})
export class TodoListsTransformationsService {
  constructor(private readonly todoListHttp: TodoListHttpService) {}

  getTodoList(id: number): CreateUpdateTodoListDto {
    let result: TodoList | undefined = this.todoListHttp.lists.find(
      (list: TodoList) => list.id === id
    );
    if (result) {
      return result;
    }
    result = {
      id: 1,
      name: 'name',
      todos: [{ name: 'name', isFinished: false }],
    };
    return result;
  }
}
