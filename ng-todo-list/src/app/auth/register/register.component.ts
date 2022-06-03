import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { UserApiService } from 'src/app/services/user-api.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private userService: UserService,
    public messageService: MessageService,
    @Inject(Router) private router: Router,
    @Inject(UserApiService) private userApi: UserApiService
  ) {}
  isValid: boolean;
  message: string;
  usernameIsValid: boolean | null;
  passwordIsValid: boolean | null;
  ngAfterContentChecked() {
    let username = this.registerForm.get('username');
    if (username) {
      this.usernameIsValid = username.valid;
    }
    let password = this.registerForm.get('password');
    if (password) {
      this.passwordIsValid = password.valid;
    }
    this.isValid = this.registerForm.status === 'VALID';
    if (!this.usernameIsValid && !this.passwordIsValid) {
      this.message = 'The username and password are too short';
    } else if (this.usernameIsValid && this.passwordIsValid) {
      this.message = '';
    } else if (!this.passwordIsValid) {
      this.message = ' the password is too short';
    } else {
      this.message = 'The username is too short';
    }
  }

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  ngOnInit(): void {}

  register() {
    let signIn = this.userApi.signIn;
    let createUserDto = this.registerForm.value;
    console.log({ createUserDto });
    this.userApi.registerUser(createUserDto).subscribe(
      () => {
        this.messageService.displayMessage('Registered User');
        if (createUserDto && createUserDto.username && createUserDto.password) {
          signIn(createUserDto.username, createUserDto.password).subscribe(
            ({ access_token }: any) => {
              if (access_token) {
                this.messageService.displayMessage('Signed In');
                this.userService.setAuthToken(access_token);
              }
            }
          );
          this.router.navigate(['']);
        }
      },
      (error) => {
        console.log(error);
        this.messageService.displayMessage('Failed to Register');
      }
    );
  }
}
