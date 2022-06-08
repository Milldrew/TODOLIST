import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { TodoList } from '../models/todo-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateUpdateTodoListDto } from '../models/create-update-todo-list.dto';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TodoListHttpService {
  constructor(public http: HttpClient, private userService: UserService) {}

  lists: TodoList[];

  setTodoLists(lists: TodoList[]) {
    this.lists = lists;
  }
  getHttpOptions() {
    if (this.userService.userData) {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.userService.userData.accessToken,
        }),
      };
      console.table(httpOptions);
      return httpOptions;
    } else {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'no toke',
        }),
      };
      console.table(httpOptions);
      return httpOptions;
    }
  }

  addTodoList(name: string) {
    console.log('hello from add  ');
    let createTodoListDto: CreateUpdateTodoListDto = {
      name,
      todos: [{ name: 'First Todo', isFinished: true }],
    };
    return this.http.post<TodoList>(
      environment.baseUrl + '/todo-list',
      createTodoListDto,
      this.getHttpOptions()
    );
  }

  getAllTodos() {
    return this.http.get<TodoList[]>(
      environment.baseUrl + '/todo-list',
      this.getHttpOptions()
    );
  }
  deleteTodoList(id: string) {
    const todoIndex = this.lists.findIndex((list: TodoList) => {
      return String(list.id) === id;
    });
    this.lists.splice(todoIndex, 1);
    this.http
      .delete(environment.baseUrl + '/todo-list/' + id, this.getHttpOptions())
      .subscribe(console.log, console.error, console.log);
  }

  updateTodoList(updateTodoListDto: CreateUpdateTodoListDto, id: string) {
    let { authorId, ...rest } = updateTodoListDto;
    updateTodoListDto = rest;
    console.log('hello from patch');
    return this.http.patch<TodoList>(
      environment.baseUrl + '/todo-list/' + id,
      updateTodoListDto,
      this.getHttpOptions()
    );
    const todoIndex = this.lists.findIndex((list: TodoList) => {
      return String(list.id) === id;
    });
    this.lists.push(
      Object.assign(this.lists.splice(todoIndex, 1)[0], updateTodoListDto)
    );
  }
}
