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

  addTodoList(name: string) {
    let createTodoListDto: CreateUpdateTodoListDto = {
      name,
      todos: [{ name: 'First Todo', isFinished: true }],
    };
    this.mockTodolists.push(...this.mockTodolists);
    this.http.post(
      environment.baseUrl + '/todo-lists',
      createTodoListDto,
      this.getHttpOptions()
    );
  }
}
