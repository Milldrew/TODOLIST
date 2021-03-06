import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoList } from '../core/models/todo-list';
import { TodoListHttpService } from '../core/services/todo-list-http.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-display-lists',
  templateUrl: './display-lists.component.html',
  styleUrls: ['./display-lists.component.scss'],
})
export class DisplayListsComponent implements OnInit {
  gettingLists = false;
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

  subscriptions: Subscription[] = [];
  addTodoList(name: string) {
    this.newListsName = name;
    const addTSub = this.todoListHttp
      .addTodoList(this.newListsName)
      .subscribe((todoListPayload: TodoList) => {
        if (this.todoLists) {
          this.todoLists.push(todoListPayload);
        } else {
          this.todoLists = [todoListPayload];
          this.todoListHttp.lists = this.todoLists;
        }
      }, console.error);
    this.subscriptions.push(addTSub);
  }

  ngOnInit(): void {
    this.todoLists = this.todoListHttp.lists;

    this.gettingLists = true;
    const getAllSub = this.todoListHttp.getAllTodos().subscribe(
      (listsPayload: TodoList[]) => {
        if (listsPayload.length > 0) {
          this.todoListHttp.setTodoLists(listsPayload);
        }
        this.gettingLists = false;
        this.todoLists = this.todoListHttp.lists;
      },
      (error) => {
        this.gettingLists = false;

        this.todoLists = this.todoListHttp.lists;

        console.error(error);
      },
      console.log
    );
    this.subscriptions.push(getAllSub);
  }
  deleteTodoList(id: number) {
    this.todoListHttp.deleteTodoList(String(id));
  }
  toggleRenameList(value: boolean) {
    this.renameListMenuIsOpen = value;
  }
  toggleAddList(value: boolean) {
    this.addListMenuIsOpen = value;
  }
  renameList(rename: string) {
    const renameSub = this.todoListHttp
      .updateTodoList({ name: rename }, String(this.listId))
      .subscribe(console.log, console.error, console.log);
    this.subscriptions.push(renameSub);

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
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
