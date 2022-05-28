import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todolist } from '../models/todolist';
import { TodolistsStoreService } from './todolists-store.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TodoListApiService {
  todolistUrl = `http://192.168.0.143:3000/todo-list`;
  //https://todolist-efqlyoo5ia-uc.a.run.app//
  todolistProdUrl = `https://todolist-efqlyoo5ia-uc.a.run.app/todo-list`;

  constructor(private http: HttpClient, private userService: UserService) {}

  getHttpOptions() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.userService.token || 'NO TOKEN',
      }),
    };
    return httpOptions;
  }

  createList(createTodolistDto: any): Observable<Object> {
    console.log('hi');
    return this.http.post(
      this.todolistProdUrl,
      createTodolistDto,
      this.getHttpOptions()
    );
  }
  getLists(): Observable<Todolist[]> {
    console.log('TOKEN', this.userService.token);
    return this.http.get<Todolist[]>(
      this.todolistProdUrl,
      this.getHttpOptions()
    );
  }

  updateList(todolist: Todolist) {
    const { id, ...updateTodolistDto } = todolist;
    return this.http
      .patch(
        `${this.todolistProdUrl}/${id}`,
        updateTodolistDto,
        this.getHttpOptions()
      )
      .subscribe((value) => console.log(value));
  }

  deleteList(id: any): any {
    console.log('HELLO');
    return this.http
      .delete(`${this.todolistProdUrl}/${id}`, this.getHttpOptions())
      .subscribe((value) => console.log(value));
  }
}
