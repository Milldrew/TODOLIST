import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rename-todo-overlay',
  templateUrl: './rename-todo-overlay.component.html',
  styleUrls: ['./rename-todo-overlay.component.scss'],
})
export class RenameTodoOverlayComponent implements OnInit {
  @ViewChild('nameInput') nameInputEl: ElementRef;
  ngAfterViewInit(): void {
    this.nameInputEl.nativeElement.focus();
  }
  name: string | null = null;
  @Output()
  closeWindowEvent = new EventEmitter<boolean>();
  @Output()
  newNameEvent = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  submitName() {
    if (this.name) this.newNameEvent.emit(this.name);
    this.closeWindowEvent.emit(false);
  }

  close() {
    this.closeWindowEvent.emit(false);
  }
}
