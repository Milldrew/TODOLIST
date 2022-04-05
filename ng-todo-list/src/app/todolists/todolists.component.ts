import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    @Inject(TodolistsStoreService) public todolistsStore: TodolistsStoreService
  ) {}
  setIsBeingEdited(event: any) {
    this.isBeingEdited = event;
  }

  addTodoList() {
    this.todolistsStore
      .addTodoList()
      .subscribe((lists: any) => (this.todolists = lists));
  }
  viewList(id: number) {
    if (!this.isBeingEdited) {
      this.router.navigate(['list', id]);
    }
  }

  ngOnInit(): void {
    this.todolistsStore.getTodoLists().subscribe((value: any) => {
      this.todolists = value;
    });
  }
}
