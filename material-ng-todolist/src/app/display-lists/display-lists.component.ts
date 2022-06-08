import { Component, ElementRef, OnInit } from '@angular/core';
import { TodoList } from '../core/models/todo-list';
import { TodoListHttpService } from '../core/services/todo-list-http.service';

@Component({
  selector: 'app-display-lists',
  templateUrl: './display-lists.component.html',
  styleUrls: ['./display-lists.component.scss'],
})
export class DisplayListsComponent implements OnInit {
  // MENU TOGGLE VALUES
  addListMenuIsOpen = false;
  renameListMenuIsOpen = false;
  //CONSTRUCTOR
  constructor(
    private readonly todoListHttp: TodoListHttpService,
    public _elementRef: ElementRef<HTMLElement>
  ) {
    this._elementRef.nativeElement.classList.add('inherit-background');
  }
  // PROPERTIES
  todoLists: TodoList[];
  todoListRoute = 'todo-list/';
  newListsName: string | null = 'hi';

  addTodoList(name: string) {
    this.newListsName = name;
    this.todoListHttp.addTodoList(this.newListsName).subscribe(
      (todoListPayload: TodoList) => {
        console.log(todoListPayload, 'PAYLOD');
        if (this.todoLists) {
          //this.todoLists.push(todoListPayload);
        }
      },
      console.error,
      console.log
    );
  }

  ngOnInit(): void {
    this.todoLists.push(...this.todoListHttp.lists);
    /*
    this.todoListHttp.getAllTodos().subscribe(
      (listsPayload: TodoList[]) => {
        this.todoListHttp.setTodoLists(listsPayload);
        //this.todoLists = this.todoListHttp.lists;
      },
      console.error,
      console.log
    );
    */
  }
  deleteTodoList(id: number) {
    console.log('before service');
    this.todoListHttp.deleteTodoList(String(id));
    console.log('after service');
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

    if (this.todoLists && this.listId) {
      const listId = this.todoLists.findIndex(
        (list) => list.id === this.listId
      );
      const list = this.todoLists.splice(listId, 1)[0];
      //this.todoLists.unshift(Object.assign(list, { name: rename }));
    }
  }
  listId: number;
  handleRenameButton(id: number) {
    this.renameListMenuIsOpen = true;
    this.listId = id;
  }
}
