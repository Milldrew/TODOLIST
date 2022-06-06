import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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
  constructor(private readonly register: RegisterService) {}
  passwordToggleValue: 'text' | 'password' = 'text';

  togglePassword() {
    console.log(this.passwordToggleValue);
    this.passwordToggleValue === 'text'
      ? (this.passwordToggleValue = 'password')
      : (this.passwordToggleValue = 'text');
  }

  registerUser() {
    this.register.register({
      username: this.emailFormControl.value,
      password: this.passwordFormControl.value,
    });
  }
  ngOnInit(): void {}
}
