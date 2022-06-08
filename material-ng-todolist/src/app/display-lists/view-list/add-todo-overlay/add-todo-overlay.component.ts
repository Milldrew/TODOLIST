import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-todo-overlay',
  templateUrl: './add-todo-overlay.component.html',
  styleUrls: ['./add-todo-overlay.component.scss'],
})
export class AddTodoOverlayComponent implements OnInit {
  name: string | null = null;

  @Output()
  closeWindow = new EventEmitter<boolean>();
  @Output()
  newName = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  submitName() {
    console.log(this.name);
    if (this.name) this.newName.emit(this.name);
    this.closeWindow.emit(false);
  }

  close() {
    this.closeWindow.emit(false);
  }
}
