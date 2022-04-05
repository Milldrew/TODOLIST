import { Component, Input, OnInit } from '@angular/core';
import { TodolistsStoreService } from 'src/app/services/todolists-store.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  beingEdited: boolean = false;
  @Input()
  todoData: any = {};
  @Input()
  todolistData: any;
  todoEdit: string = this.todoData.name;
  isFinished: boolean = false;
  icon: string = '□';

  toggleFinished() {
    this.isFinished = !this.isFinished;
    if (this.isFinished) {
      this.icon = '✓';
    } else {
      this.icon = '□';
    }
  }
  startEdit() {
    this.beingEdited = true;
    /*
    const index = this.todolistData.todos.findIndex(
      (todo: any) => todo.name === this.todoData.name
    );

    this.todolistData.todos.splice(index, 1);
    */
  }
  submitEdit() {
    this.beingEdited = false;
  }

  remove() {
    const index = this.todolistData.todos.findIndex(
      (todo: any) => todo.name === this.todoData.name
    );

    this.todolistData.todos.splice(index, 1);
  }
  constructor(private todolistStore: TodolistsStoreService) {}
  ngOnInit(): void {
    this.todoEdit = this.todoData.name;
  }
}
