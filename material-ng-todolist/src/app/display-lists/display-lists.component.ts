import { Component, ElementRef, OnInit } from '@angular/core';
import { TodoList } from '../core/models/todo-list';
import { TodoListHttpService } from '../core/services/todo-list-http.service';

@Component({
  selector: 'app-display-lists',
  templateUrl: './display-lists.component.html',
  styleUrls: ['./display-lists.component.scss'],
})
export class DisplayListsComponent implements OnInit {
  addListMenuIsOpen = false;
  renameListMenuIsOpen = false;
  constructor(
    private readonly todoListHttp: TodoListHttpService,
    public _elementRef: ElementRef<HTMLElement>
  ) {
    this._elementRef.nativeElement.classList.add('inherit-background');
  }

  todoLists: TodoList[] | null = null;
  todoListRoute = 'todo-list/';

  newListsName: string | null = 'hi';

  addTodoList(name: string) {
    this.newListsName = name;
    this.todoListHttp.addTodoList(this.newListsName).subscribe(
      (todoListPayload: TodoList) => {
        console.log(todoListPayload, 'PAYLOD');
        if (this.todoLists) {
          this.todoLists.push(todoListPayload);
        }
      },
      console.error,
      console.log
    );
  }

  ngOnInit(): void {
    this.todoListHttp.getAllTodos().subscribe(
      (listsPayload: TodoList[]) => {
        this.todoListHttp.setTodoLists(listsPayload);
        this.todoLists = this.todoListHttp.lists;
      },
      console.error,
      console.log
    );
  }
  deleteTodoList(id: number) {
    console.log('before service');
    this.todoListHttp.deleteTodoList(String(id));
    console.log('after service');
  }
  updateTodoList(todoList: TodoList, name: string) {
    this.todoListHttp.updateTodoList(todoList, name);
  }
  toggleRenameList(value: boolean) {
    this.renameListMenuIsOpen = value;
  }
  toggleAddList(value: boolean) {
    this.addListMenuIsOpen = value;
  }
  renameList(rename: string) {
    console.log(this.listId, 'id from template');
    this.todoListHttp
      .updateTodoList({ name: rename }, String(this.listId))
      .subscribe(console.log, console.error, console.log);
    this.todoLists = this.todoListHttp.lists;
  }
  listId: number;
  handleRenameButton(id: number) {
    this.renameListMenuIsOpen = true;
    this.listId = id;
  }
}
