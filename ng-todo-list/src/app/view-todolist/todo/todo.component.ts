import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TodoListApiService } from 'src/app/services/todo-list-api.service';
import { TodolistsStoreService } from 'src/app/services/todolists-store.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @ViewChild('editName') editNameElement: ElementRef;

  beingEdited: boolean = false;
  @Input()
  todoData: any = {};
  @Input()
  todolistData: any;
  todoEdit: string = this.todoData.name;
  isFinished: boolean;
  icon: string = '□';

  toggleFinished() {
    this.isFinished = !this.isFinished;
    if (this.isFinished) {
      this.icon = '✓';
    } else {
      this.icon = '□';
    }
    const index = this.todolistData.todos.findIndex(
      (todo: any) => todo.name === this.todoData.name
    );
    this.todolistData.todos[index]['isFinished'] = this.isFinished;
    this.listApi.updateList(this.todolistData);
  }
  startEdit() {
    this.beingEdited = true;
    this.todoEdit = '';
    setTimeout(() => {
      this.editNameElement.nativeElement.focus();
    }, 10);
  }
  submitEdit() {
    this.beingEdited = false;
    const index = this.todolistData.todos.findIndex(
      (todo: any) => todo.name === this.todoData.name
    );
    this.todolistData.todos[index]['name'] = this.todoEdit;
    this.listApi.updateList(this.todolistData);
  }

  remove() {
    const index = this.todolistData.todos.findIndex(
      (todo: any) => todo.name === this.todoData.name
    );

    this.todolistData.todos.splice(index, 1);
    this.listApi.updateList(this.todolistData);
  }
  constructor(
    private todolistStore: TodolistsStoreService,
    private listApi: TodoListApiService
  ) {}
  ngOnInit(): void {
    this.todoEdit = this.todoData.name;
    this.isFinished = this.todoData.isFinished;
    if (this.isFinished) {
      this.icon = '✓';
    } else {
      this.icon = '□';
    }
  }
}
