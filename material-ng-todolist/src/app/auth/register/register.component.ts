import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { IncomingUser, User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { SignInService } from '../services/sign-in.service';

export class AuthErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  matcher = new AuthErrorStateMatcher();
  constructor(
    private readonly signInService: SignInService,
    private readonly userService: UserService,
    private _regSnackBar: MatSnackBar,
    private readonly register: RegisterService,
    public router: Router
  ) {}
  passwordToggleValue: 'text' | 'password' = 'text';

  togglePassword() {
    this.passwordToggleValue === 'text'
      ? (this.passwordToggleValue = 'password')
      : (this.passwordToggleValue = 'text');
  }

  registerUser() {
    this.register
      .register(
        {
          username: this.emailFormControl.value,
          password: this.passwordFormControl.value,
        },
        this.router
      )
      .subscribe(
        (payload: User) => {
          this.regSnackBarOpen(`${payload.username} registered.`);
          this.userService.setUser({ username: payload.username });
          const signInDto = {
            username: payload.username,
            password: payload.password,
          };
          this.signInService.signIn(signInDto, this.router).subscribe(
            (dataPayload: IncomingUser) => {
              this.regSnackBarOpen(` Signed In!`);
              let { access_token, ...payload } = dataPayload;
              this.userService.setUser({
                accessToken: 'Bearer ' + access_token,
                ...payload,
              });
              this.userService.setUser({
                username: signInDto.username.replace(/@.*$/, ''),
              });
              this.router
                .navigate(['todo-lists'])
                .then(() => location.reload());
            },
            console.error,
            console.log
          );
        },
        (registerError) => {
          console.error(registerError);
          this.regSnackBarOpen(registerError.error.message);
        },
        console.log
      );
  }
  ngOnInit(): void {}
  regSnackBarOpen(message: string) {
    this._regSnackBar.open(message, 'DISMISS', {
      verticalPosition: 'top',
    });
    setTimeout(() => {
      this._regSnackBar.dismiss();
    }, 3500);
  }
}
