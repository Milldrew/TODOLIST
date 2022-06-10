import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDto } from '../models/register-dto';
import { UserService } from 'src/app/core/services/user.service';
import { SignInService } from './sign-in.service';
import { User } from 'src/app/core/models/user';
import { Router } from '@angular/router';
import { TodoListHttpService } from 'src/app/core/services/todo-list-http.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private readonly todoList: TodoListHttpService,
    private readonly http: HttpClient,
    private readonly userService: UserService,
    private readonly signInService: SignInService
  ) {}

  register(registerDto: RegisterDto, router: Router) {
    console.log({ registerDto });
    console.log('BASE URL', environment.baseUrl);
    this.http.post<User>(`${environment.baseUrl}/user`, registerDto).subscribe(
      (payload: User) => {
        console.log(payload, 'payload');
        this.userService.setUser(payload);
        const signInDto = {
          username: payload.username,
          password: payload.password,
        };
        this.signInService.signIn(signInDto, router);
      },
      console.error,
      console.log
    );
  }
}
