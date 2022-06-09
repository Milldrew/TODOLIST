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

  setTodo: Todo;
  closeWindow(event: boolean) {
    this.todoMenuIsOpen = event;
    console.log(event);
  }
  addTodo(event: string) {
    if (this.todoListPayload && Array.isArray(this.todoListPayload.todos)) {
      let updateTodoListDto = this.todoListPayload.todos.push({
        name: event,
        isFinished: false,
      });
      console.table(updateTodoListDto);
      this.todoListHttp.updateTodoList(
        updateTodoListDto,
        String(this.todoListId)
      );
    }
  }
  deleteTodo(name: string) {
    if (this.todoListPayload && this.todoListPayload.todos) {
      const todoIndex = this.todoListPayload.todos.findIndex(
        (todo) => todo.name === name
      );

      this.todoListPayload.todos.splice(todoIndex, 1);
      this.todoListHttp.updateTodoList(
        this.todoListPayload,
        String(this.todoListId)
      );
    }
  }

  handleCloseRenameOverlay(closeEvent: boolean) {
    this.moreVertIsOpen = false;
  }

  handleRenameTodo(name: string) {
    console.log(name);
  }

  ngOnInit(): void {}
  todoMenuIsOpen = false;
  moreVertIsOpen = true;
}
