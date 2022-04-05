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
  percentFinished: string = '0%';
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
    this.beingEdited = true;
    this.emitBeingEdited.emit(this.beingEdited);
  }
  submitEdit() {
    this.beingEdited = false;
    this.todolistData['name'] = this.todolistEdit;
    this.emitBeingEdited.emit(this.beingEdited);
  }
  ngOnInit(): void {
    this.todolistEdit = this.todolistData.name;
    this.emitBeingEdited.emit(this.beingEdited);
  }
}
