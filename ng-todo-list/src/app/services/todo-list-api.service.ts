import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todolist } from '../models/todolist';

@Injectable({
  providedIn: 'root',
})
export class TodoListApiService {
  constructor(private http: HttpClient) {}

  todolistUrl = `http://192.168.0.143:3000/todo-list`;

  getLists(): Observable<Todolist[]> {
    return this.http.get<Todolist[]>(this.todolistUrl);
  }
}
