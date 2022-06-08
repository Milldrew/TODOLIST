import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rename-overlay',

  templateUrl: './rename-overlay.component.html',
  styleUrls: ['./rename-overlay.component.scss'],
})
export class RenameOverlayComponent implements OnInit {
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
