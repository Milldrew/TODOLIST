import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  @ViewChild('username') inputElement: ElementRef;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    });
  }

  signIn() {}
}
