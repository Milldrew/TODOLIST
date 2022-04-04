import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  isFinished: boolean = false;
  icon: string = '□';

  toggleFinished() {
    this.isFinished = !this.isFinished;
  }
  constructor() {}
  @Input()
  todoData: any = {};
  ngOnInit(): void {}
}
