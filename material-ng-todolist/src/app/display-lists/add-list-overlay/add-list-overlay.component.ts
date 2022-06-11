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
  selector: 'app-add-list-overlay',
  templateUrl: './add-list-overlay.component.html',
  styleUrls: ['./add-list-overlay.component.scss'],
})
export class AddListOverlayComponent implements OnInit {
  name: string | null = null;

  @ViewChild('nameInput') nameInputEl: ElementRef;

  ngAfterViewInit(): void {
    this.nameInputEl.nativeElement.focus();
  }

  @Output()
  closeWindow = new EventEmitter<boolean>();
  @Output()
  newName = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  submitName() {
    if (this.name) this.newName.emit(this.name);
    this.closeWindow.emit(false);
  }

  close() {
    this.closeWindow.emit(false);
  }
}
