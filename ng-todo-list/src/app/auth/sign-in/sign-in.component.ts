import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  @ViewChild('username') inputElement: ElementRef;

  constructor(
    private router: Router,
    private userService: UserService,
    private userApi: UserApiService
  ) {}

  signInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit(): void {
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    });
  }

  signIn() {
    const { username, password } = this.signInForm.value;
    this.userApi.signIn(username, password);
  }
}
