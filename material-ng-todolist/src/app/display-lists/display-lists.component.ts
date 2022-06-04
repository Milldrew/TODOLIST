import { Component, OnInit } from '@angular/core';
import { TodoList } from '../core/models/todo-list';
import { TodoListHttpService } from '../core/services/todo-list-http.service';

@Component({
  selector: 'app-display-lists',
  templateUrl: './display-lists.component.html',
  styleUrls: ['./display-lists.component.scss'],
})
export class DisplayListsComponent implements OnInit {
  constructor(private readonly todoListHttp: TodoListHttpService) {}

  todoLists: TodoList[] = this.todoListHttp.mockTodolists;

  ngOnInit(): void {}
}
