import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignInComponent, RegisterComponent],
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatInputModule],
  exports: [SignInComponent, RegisterComponent],
})
export class AuthModule {}
