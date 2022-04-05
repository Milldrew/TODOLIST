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
  }

  remove() {
    const index = this.todolistData.todos.findIndex(
      (todo: any) => todo.name === this.todoData.name
    );

    this.todolistData.todos.splice(index, 1);
  }
  constructor(
    private todolistStore: TodolistsStoreService,
    private listApi: TodoListApiService
  ) {}
  ngOnInit(): void {
    this.todoEdit = this.todoData.name;
  }
}
