import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateUpdateTodoListDto } from 'src/app/core/models/create-update-todo-list.dto';
import { Todo } from 'src/app/core/models/todo';
import { TodoList } from 'src/app/core/models/todo-list';
import { TodoListHttpService } from 'src/app/core/services/todo-list-http.service';
import { TodoListsTransformationsService } from 'src/app/core/services/todo-lists-transformations.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss'],
})
export class ViewListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] | any[] = [];
  todoListId: number | null = null;
  todoListPayload: CreateUpdateTodoListDto;
  constructor(
    public readonly todoListHttp: TodoListHttpService,
    public route: ActivatedRoute,
    private readonly todoListsTransformer: TodoListsTransformationsService
  ) {
    this.todoListId = Number(this.route.snapshot.paramMap.get('id'));
    this.todoListPayload = this.todoListsTransformer.getTodoList(
      this.todoListId
    );
  }

  closeWindow(event: boolean) {
    this.todoMenuIsOpen = event;
  }
  addTodo(event: string) {
    if (this.todoListPayload && Array.isArray(this.todoListPayload.todos)) {
      this.todoListPayload.todos.push({
        name: event,
        isFinished: false,
      });
      let updateTodoListDto = this.todoListPayload;
      const updateSub = this.todoListHttp
        .updateTodoList(updateTodoListDto, String(this.todoListId))
        .subscribe(console.log, console.error, console.log);
      this.subscriptions.push(updateSub);
    }
  }
  deleteTodo(name: string) {
    if (this.todoListPayload && this.todoListPayload.todos) {
      const todoIndex = this.todoListPayload.todos.findIndex(
        (todo) => todo.name === name
      );

      this.todoListPayload.todos.splice(todoIndex, 1);
      const deleteSub = this.todoListHttp
        .updateTodoList(this.todoListPayload, String(this.todoListId))
        .subscribe(console.log, console.error, console.log);
      this.subscriptions.push(deleteSub);
    }
  }

  handleCloseRenameOverlay(closeEvent: boolean) {
    this.moreVertIsOpen = false;
  }

  handleRenameTodo(name: string) {
    if (this.todoListPayload && this.todoListPayload.todos) {
      const index = this.todoListPayload.todos.findIndex(
        (todo) => todo.name === this.todoName
      );

      const todo = this.todoListPayload.todos.splice(index, 1)[0];
      todo.name = name;
      this.todoListPayload.todos.unshift(todo);
      const getSub = this.todoListHttp
        .updateTodoList(this.todoListPayload, String(this.todoListId))
        .subscribe(console.log, console.error, console.log);
      this.subscriptions.push(getSub);
    }
  }
  handleOpenRenameOverlay(todoName: string) {
    this.todoName = todoName;
    this.moreVertIsOpen = true;
  }

  ngOnInit(): void {}
  todoMenuIsOpen = false;
  moreVertIsOpen = false;
  todoName: string;
  currentTodo: Todo;
  setCurrentTodo(todo: any) {
    this.currentTodo = todo;
  }
  handleSelectionChange(eventPayload: any) {
    setTimeout(() => {
      this.currentTodo.isFinished = !this.currentTodo.isFinished;

      if (this.todoListId) {
        const handSelectionSub = this.todoListHttp
          .updateTodoList(this.todoListPayload, String(this.todoListId))
          .subscribe(console.log, console.error, console.log);
        this.subscriptions.push(handSelectionSub);
      }
    });
  }
  ngOnDestroy() {
    if (this.subscriptions.length) {
      this.subscriptions.forEach((sub: Subscription) => {
        sub.unsubscribe();
      });
    }
  }
}
