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

  @ViewChild('nameInput') nameInputEl: ElementRef;
  ngAfterViewInit(): void {
    this.nameInputEl.nativeElement.focus();
  }
  ngOnInit(): void {}

  submitName() {
    if (this.name) this.newNameEvent.emit(this.name);
    this.closeWindowEvent.emit(false);
  }

  close() {
    this.closeWindowEvent.emit(false);
  }
}
