import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { TodoList } from '../core/models/todo-list';
import { TodoListHttpService } from '../core/services/todo-list-http.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-display-lists',
  templateUrl: './display-lists.component.html',
  styleUrls: ['./display-lists.component.scss'],
})
export class DisplayListsComponent implements OnInit {
  //EventsEmitters
  @Output()
  usernameEvent = new EventEmitter<string>();
  // MENU TOGGLE VALUES
  addListMenuIsOpen = false;
  renameListMenuIsOpen = false;
  //CONSTRUCTOR
  constructor(
    private readonly userService: UserService,
    private readonly todoListHttp: TodoListHttpService,
    public _elementRef: ElementRef<HTMLElement>
  ) {
    this._elementRef.nativeElement.classList.add('inherit-background');
  }
  // PROPERTIES
  todoLists: TodoList[];

  /*= [
    {
      id: 1,
      name: 'name',
      todos: [
        { name: 'name', isFinished: false },
        { name: 'name', isFinished: false },
        { name: 'name', isFinished: false },
      ],
    },
  ];
  */
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
    this.usernameEvent.emit(this.userService.userData.username);

    console.log('http lists', this.todoListHttp.lists);
    this.todoLists = this.todoListHttp.lists;
    this.todoListHttp.getAllTodos().subscribe(
      (listsPayload: TodoList[]) => {
        if (listsPayload.length > 0) {
          this.todoListHttp.setTodoLists(listsPayload);
        }
        this.todoLists = this.todoListHttp.lists;
      },
      (error) => {
        this.todoLists = this.todoListHttp.lists;

        console.error(error);
      },
      console.log
    );
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
      this.todoLists.unshift(Object.assign(list, { name: rename }));
    }
  }
  listId: number;
  handleRenameButton(id: number) {
    this.renameListMenuIsOpen = true;
    this.listId = id;
  }
}
