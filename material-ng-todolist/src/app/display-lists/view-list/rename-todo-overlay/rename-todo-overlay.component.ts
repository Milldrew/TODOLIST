import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rename-todo-overlay',
  templateUrl: './rename-todo-overlay.component.html',
  styleUrls: ['./rename-todo-overlay.component.scss'],
})
export class RenameTodoOverlayComponent implements OnInit {
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
