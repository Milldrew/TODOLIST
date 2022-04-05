import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  todolistEdit: string;

  constructor(
    @Inject(TodolistsStoreService) private todoListStore: TodolistsStoreService
  ) {}
  removeTodolist(id: number, e: Event) {
    e.stopPropagation();
    this.todoListStore.removeTodolist(id);
  }

  startEdit(event: Event) {
    setTimeout(() => {
      this.listNameInput.nativeElement.focus();
    }, 100);
    event.stopPropagation();
    this.beingEdited = true;
  }
  submitEdit() {
    this.beingEdited = false;
    this.todolistData['name'] = this.todolistEdit;
  }
  ngOnInit(): void {
    this.todolistEdit = this.todolistData.name;
  }
}
