import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  @Input()
  name: string = 'list name';

  percentFinished: string = '0%';
  constructor() {}

  ngOnInit(): void {}
}
