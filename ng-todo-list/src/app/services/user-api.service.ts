import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todolist } from '../models/todolist';
import { TodolistsStoreService } from './todolists-store.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  userUrl = `http://192.168.0.143:3000/`;
  constructor(private http: HttpC{


  createList(createTodolistDto: any): Observable<Object> {
    console.log('hi');
    return this.http.post(this.todolistUrl, createTodolistDto);
  }
  getLists(): Observable<Todolist[]> {
    return this.http.get<Todolist[]>(this.todolistUrl);
  }

  updateList(todolist: Todolist) {
    const { id, ...updateTodolistDto } = todolist;
    return this.http
      .patch(`${this.todolistUrl}/${id}`, updateTodolistDto)
      .subscribe((value) => console.log(value));
  }

  deleteList(id: any): any {
    console.log('HELLO');
    return this.http
      .delete(`${this.todolistUrl}/${id}`)
      .subscribe((value) => console.log(value));
  }
}



