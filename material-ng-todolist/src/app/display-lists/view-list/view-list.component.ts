import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class ViewListComponent implements OnInit {
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
    console.log(event);
  }
  addTodo(event: string) {
    if (this.todoListPayload && Array.isArray(this.todoListPayload.todos)) {
      this.todoListPayload.todos.push({
        name: event,
        isFinished: false,
      });
      let updateTodoListDto = this.todoListPayload;
      console.table(updateTodoListDto.todos);
      this.todoListHttp
        .updateTodoList(updateTodoListDto, String(this.todoListId))
        .subscribe(console.log, console.error, console.log);
    }
  }
  deleteTodo(name: string) {
    if (this.todoListPayload && this.todoListPayload.todos) {
      const todoIndex = this.todoListPayload.todos.findIndex(
        (todo) => todo.name === name
      );

      this.todoListPayload.todos.splice(todoIndex, 1);
      this.todoListHttp
        .updateTodoList(this.todoListPayload, String(this.todoListId))
        .subscribe(console.log, console.error, console.log);
    }
  }

  handleCloseRenameOverlay(closeEvent: boolean) {
    this.moreVertIsOpen = false;
  }

  handleRenameTodo(name: string) {
    console.log(name);
    if (this.todoListPayload && this.todoListPayload.todos) {
      const index = this.todoListPayload.todos.findIndex(
        (todo) => todo.name === this.todoName
      );

      const todo = this.todoListPayload.todos.splice(index, 1)[0];
      todo.name = name;
      this.todoListPayload.todos.unshift(todo);
      this.todoListHttp
        .updateTodoList(this.todoListPayload, String(this.todoListId))
        .subscribe(console.log, console.error, console.log);
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
      console.log(this.currentTodo, 'from selection change');

      if (this.todoListId) {
        this.todoListHttp
          .updateTodoList(this.todoListPayload, String(this.todoListId))
          .subscribe(console.log, console.error, console.log);
      }
    });
  }
}
