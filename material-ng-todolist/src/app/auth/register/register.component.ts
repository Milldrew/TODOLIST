import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    public router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // /register?demo=1 (the sign-in page's "Try it" button) goes straight in.
    if (this.route.snapshot.queryParamMap.get('demo')) this.tryDemo();
  }

  /** A throwaway account, so trying the app needs no email or password. */
  tryDemo() {
    const id = Math.random().toString(36).slice(2, 10);
    this.emailFormControl.setValue(`demo-${id}@example.com`);
    this.passwordFormControl.setValue(Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2));
    this.registerUser();
  }
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
            // The API never returns a password; use the one just typed.
            password: this.passwordFormControl.value,
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
  regSnackBarOpen(message: string) {
    this._regSnackBar.open(message, 'DISMISS', {
      verticalPosition: 'top',
    });
    setTimeout(() => {
      this._regSnackBar.dismiss();
    }, 3500);
  }
}
