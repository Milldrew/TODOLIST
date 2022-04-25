import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoListApiService } from 'src/app/services/todo-list-api.service';
import { TodolistsStoreService } from 'src/app/services/todolists-store.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  @ViewChild('editName') listNameInput: ElementRef;
  @Input()
  todolistData: any = {};
  percentFinished: number;
  beingEdited: boolean = false;
  @Output() emitBeingEdited: EventEmitter<boolean>;
  todolistEdit: string;

  constructor(
    @Inject(TodoListApiService) private listApi: TodoListApiService,
    @Inject(TodolistsStoreService) private todoListStore: TodolistsStoreService
  ) {
    this.emitBeingEdited = new EventEmitter<boolean>();
  }
  removeTodolist(id: number, e: Event) {
    e.stopPropagation();
    this.todoListStore.removeTodolist(id);
    this.listApi.deleteList(id);
  }

  startEdit(event: Event) {
    setTimeout(() => {
      this.listNameInput.nativeElement.focus();
    }, 100);
    event.stopPropagation();
    this.todolistEdit = '';
    this.beingEdited = true;
    this.emitBeingEdited.emit(this.beingEdited);
  }
  submitEdit() {
    this.beingEdited = false;
    this.todolistData['name'] = this.todolistEdit;
    this.listApi.updateList(this.todolistData);
    this.emitBeingEdited.emit(this.beingEdited);
  }
  ngOnInit(): void {
    this.todolistEdit = this.todolistData.name;
    this.emitBeingEdited.emit(this.beingEdited);
    let todoCount = this.todolistData.todos.length;
    this.percentFinished = this.todolistData.todos.reduce(
      (acc: any, curr: Todo, index: number) => {
        if (curr.isFinished) {
          if (todoCount === index + 1) {
            acc += 1;
            return Math.floor((acc / todoCount) * 100);
          }
          return (acc += 1);
        } else {
          if (todoCount === index + 1) {
            return Math.floor((acc / todoCount) * 100);
          }
          return acc;
        }
      },
      0
    );
  }
}
