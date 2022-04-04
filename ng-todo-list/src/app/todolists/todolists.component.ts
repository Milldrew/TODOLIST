import { Component, OnInit } from '@angular/core';
import { TodolistsStoreService } from '../services/todolists-store.service';

@Component({
  selector: 'app-todolists',
  templateUrl: './todolists.component.html',
  styleUrls: ['./todolists.component.css'],
})
export class TodolistsComponent implements OnInit {
  todolists: any;

  constructor(public todolistsStore: TodolistsStoreService) {}

  ngOnInit(): void {
    this.todolistsStore.getTodoLists().subscribe((value) => {
      this.todolists = value;
    });
  }
}
