import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  @ViewChild('username') inputElement: ElementRef;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    });
  }
}
