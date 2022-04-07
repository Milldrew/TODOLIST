import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}
  messages: string[] = [];
  messages$ = of(this.messages);
  displayMessage(message: string) {
    this.messages.push(message);
    return this.messages$;
  }
}
