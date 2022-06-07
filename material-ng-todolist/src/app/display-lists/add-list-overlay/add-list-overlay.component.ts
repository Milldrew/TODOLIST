import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-list-overlay',
  templateUrl: './add-list-overlay.component.html',
  styleUrls: ['./add-list-overlay.component.scss'],
})
export class AddListOverlayComponent implements OnInit {
  name: string | null = null;

  @Output()
  closeWindow = new EventEmitter<string>();
  @Output()
  newName = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  submitName() {
    console.log(this.name);
    if (this.name) this.newName.emit(this.name);
  }
}
