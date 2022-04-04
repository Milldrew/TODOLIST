import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodolistsStoreService } from '../services/todolists-store.service';

@Component({
  selector: 'app-view-todolist',
  templateUrl: './view-todolist.component.html',
  styleUrls: ['./view-todolist.component.css'],
})
export class ViewTodolistComponent implements OnInit {
  todolistData: any;
  constructor(
    private todolistStore: TodolistsStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((value) => {
      let listId = Number(value['id']);
      console.log(value);
      this.todolistData = this.todolistStore.getTodolistById(listId);
    });
  }
}
