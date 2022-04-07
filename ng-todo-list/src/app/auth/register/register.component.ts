import { FormControl, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { UserApiService } from 'src/app/services/user-api.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    public messageService: MessageService,
    @Inject(Router) private router: Router,
    @Inject(UserApiService) private userApi: UserApiService
  ) {}

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit(): void {}

  register() {
    let createUserDto = this.registerForm.value;
    console.log({ createUserDto });
    this.userApi.registerUser(createUserDto).subscribe(
      () => {
        this.messageService.displayMessage('Registered User');
        this.router.navigate(['']);
      },
      () => this.messageService.displayMessage('Failed to Register')
    );
  }
}
