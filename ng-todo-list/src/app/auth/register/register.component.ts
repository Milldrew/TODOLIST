import { FormControl, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(@Inject(UserApiService) private userApi: UserApiService) {}

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit(): void {}

  register() {
    let createUserDto = this.registerForm.value;
    console.log({ createUserDto });
    this.userApi.registerUser(createUserDto);
  }
}
