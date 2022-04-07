import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}
  messages: string[] = [];
  displayMessage(message: string) {
    this.messages.push(message);
    setTimeout(() => {
      this.messages.shift();
    }, 2000);
  }
}
