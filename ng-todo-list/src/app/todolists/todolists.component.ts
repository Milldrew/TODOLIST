import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
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
    public messageService: MessageService,
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
        name: 'New List',
        todos: [{ name: 'New Todo', isFinished: false }],
      })
      .subscribe(
        (value) => {
          console.log(value);
          this.messageService.displayMessage('Created Todo List');
        },
        (error) => {
          this.messageService.displayMessage('Failed to create Todo List');
        }
      );
    setTimeout(() => {
      this.listApi.getLists().subscribe((value: any) => {
        this.todolistsStore.setTodoLists(value);
        this.todolists = value;
      });
    }, 2000);
    setTimeout(() => {
      this.listApi.getLists().subscribe((value: any) => {
        this.todolistsStore.setTodoLists(value);
        this.todolists = value;
      });
    }, 100);
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
