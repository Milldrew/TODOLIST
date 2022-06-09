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
  closeWindowEvent = new EventEmitter<boolean>();
  @Output()
  newNameEvent = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  submitName() {
    console.log(this.name);
    if (this.name) this.newNameEvent.emit(this.name);
    this.closeWindowEvent.emit(false);
  }

  close() {
    this.closeWindowEvent.emit(false);
  }
}
