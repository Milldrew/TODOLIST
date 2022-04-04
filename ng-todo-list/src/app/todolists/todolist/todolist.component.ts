import { Component, Inject, Input, OnInit } from '@angular/core';
import { TodolistsStoreService } from 'src/app/services/todolists-store.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  @Input()
  todolistData: any = {};
  percentFinished: string = '0%';

  constructor(
    @Inject(TodolistsStoreService) private todoListStore: TodolistsStoreService
  ) {}
  removeTodolist(id: number) {
    this.todoListStore.removeTodolist(id);
  }
  ngOnInit(): void {}
}
