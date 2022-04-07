import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css'],
})
export class MessageBoxComponent implements OnInit {
  constructor(private messageService: MessageService) {}
  messages: any[] = [];
  hasMessages: boolean = !!this.messages.length;

  ngAfterContentChecked() {
    this.hasMessages = !!this.messages.length;
    this.messageService
      .displayMessage('hi')
      .subscribe((value) => (this.messages = value));
  }
  ngOnInit(): void {}
}
