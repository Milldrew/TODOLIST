import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IncomingUser } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { SignInDto } from '../models/sign-in-dto';
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
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
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
    private readonly userService: UserService,
    private _regSnackBar: MatSnackBar,
    public router: Router,
    private readonly signInService: SignInService
  ) {}
  passwordToggleValue: 'text' | 'password' = 'text';

  togglePassword() {
    this.passwordToggleValue === 'text'
      ? (this.passwordToggleValue = 'password')
      : (this.passwordToggleValue = 'text');
  }

  signIn() {
    this.signInService
      .signIn(
        {
          username: this.emailFormControl.value,
          password: this.passwordFormControl.value,
        },
        this.router
      )
      .subscribe(
        (dataPayload: IncomingUser) => {
          this.regSnackBarOpen(` Signed In!`);
          let { access_token, ...payload } = dataPayload;
          this.userService.setUser({
            accessToken: 'Bearer ' + access_token,
            ...payload,
          });
          this.userService.setUser({
            username: this.emailFormControl.value.replace(/@.*$/, ''),
          });
          this.router.navigate(['todo-lists']).then(() => location.reload);
        },
        console.error,
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
