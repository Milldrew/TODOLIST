import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  todoListPayload: TodoList | null = null;
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
  renameTodo(event: string) {}

  ngOnInit(): void {}
  todoMenuIsOpen = true;
  moreVertIsOpen = false;
}
