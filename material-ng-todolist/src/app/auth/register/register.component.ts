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
    private _regSnackBar: MatSnackBar,
    private readonly register: RegisterService,
    public router: Router
  ) {}
  passwordToggleValue: 'text' | 'password' = 'text';

  togglePassword() {
    console.log(this.passwordToggleValue);
    this.passwordToggleValue === 'text'
      ? (this.passwordToggleValue = 'password')
      : (this.passwordToggleValue = 'text');
  }

  registerUser() {
    this.register.register(
      {
        username: this.emailFormControl.value,
        password: this.passwordFormControl.value,
      },
      this.router
    );
  }
  ngOnInit(): void {
    this._regSnackBar.open('hello', 'DISMISS', { verticalPosition: 'top' });
  }
}
