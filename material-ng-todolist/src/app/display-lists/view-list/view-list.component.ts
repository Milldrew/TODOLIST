import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoList } from 'src/app/core/models/todo-list';
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
    public route: ActivatedRoute,
    private readonly todoListsTransformer: TodoListsTransformationsService
  ) {
    this.todoListId = Number(this.route.snapshot.paramMap.get('id'));
    this.todoListPayload = this.todoListsTransformer.getTodoList(
      this.todoListId
    );
  }

  ngOnInit(): void {}
  todoMenuIsOpen = false;
  moreVertIsOpen = true;
}
