import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodolistsStoreService } from '../services/todolists-store.service';

@Component({
  selector: 'app-todolists',
  templateUrl: './todolists.component.html',
  styleUrls: ['./todolists.component.css'],
})
export class TodolistsComponent implements OnInit {
  todolists: any;

  constructor(
    private route: ActivatedRoute,
    @Inject(TodolistsStoreService) public todolistsStore: TodolistsStoreService
  ) {}

  addTodoList() {
    this.todolistsStore
      .addTodoList()
      .subscribe((lists: any) => (this.todolists = lists));
  }
  viewList(id: number) {
    this.route.params;
  }

  ngOnInit(): void {
    this.todolistsStore.getTodoLists().subscribe((value: any) => {
      this.todolists = value;
    });
  }
}
