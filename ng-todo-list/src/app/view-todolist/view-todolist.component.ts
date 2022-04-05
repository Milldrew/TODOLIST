import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoListApiService } from '../services/todo-list-api.service';
import { TodolistsStoreService } from '../services/todolists-store.service';

@Component({
  selector: 'app-view-todolist',
  templateUrl: './view-todolist.component.html',
  styleUrls: ['./view-todolist.component.css'],
})
export class ViewTodolistComponent implements OnInit {
  todolistData: any;
  constructor(
    private listApi: TodoListApiService,
    private todolistStore: TodolistsStoreService,
    private route: ActivatedRoute
  ) {}

  addTodo() {
    this.todolistData.todos.push({ name: 'New Todo', isFinished: false });
    this.listApi.updateList(this.todolistData);
  }

  ngOnInit(): void {
    this.listApi.getLists().subscribe((lists) => {
      this.todolistStore.setTodoLists(lists);
    });

    setTimeout(() => {
      this.route.params.subscribe((value) => {
        let listId = Number(value['id']);
        this.todolistData = this.todolistStore.getTodolistById(listId);
      });
    }, 1000);
  }
}
