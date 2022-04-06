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
    if (this.userService.isAuthenticated) {
      this.router.navigate(['lists']);
    }
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    });
  }

  signIn() {
    const { username, password } = this.signInForm.value;
    const payload = this.userApi.signIn(username, password);
    if (payload) {
      payload.subscribe(
        ({ access_token }: any) => {
          this.userService.setAuthToken(access_token);
          this.userService.setIsAuthenticated(true);
          this.router.navigate(['lists']);
        },
        (error: any) => {
          if (error.status === 401) {
            console.error('invalid user information');
          }
        }
      );
    }
  }
}
