import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoListApiService } from '../services/todo-list-api.service';
import { TodolistsStoreService } from '../services/todolists-store.service';

@Component({
  selector: 'app-todolists',
  templateUrl: './todolists.component.html',
  styleUrls: ['./todolists.component.css'],
})
export class TodolistsComponent implements OnInit {
  todolists: any;
  isBeingEdited: boolean;

  constructor(
    @Inject(TodoListApiService) private listApi: TodoListApiService,
    private router: Router,
    @Inject(TodolistsStoreService) public todolistsStore: TodolistsStoreService
  ) {}
  setIsBeingEdited(event: any) {
    this.isBeingEdited = event;
  }

  addTodoList() {
    this.listApi
      .createList({
        authorId: 1,
        name: 'New List',
        todos: [{ name: 'New Todo', isFinished: false }],
      })
      .subscribe((value) => console.log(value));
    setTimeout(() => {
      this.listApi.getLists().subscribe((value: any) => {
        this.todolistsStore.setTodoLists(value);
        this.todolists = value;
      });
    }, 400);
  }
  viewList(id: number) {
    if (!this.isBeingEdited) {
      this.router.navigate(['list', id]);
    }
  }

  ngOnInit(): void {
    this.listApi.getLists().subscribe((value: any) => {
      this.todolistsStore.setTodoLists(value);
      this.todolists = value;
    });
  }
}
