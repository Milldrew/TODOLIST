import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDto } from '../models/register-dto';
import { UserService } from 'src/app/core/services/user.service';
import { SignInService } from './sign-in.service';
import { User } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService,
    private readonly signInService: SignInService
  ) {}

  register(registerDto: RegisterDto) {
    console.log({ registerDto });
    this.http.post<User>(`${environment.baseUrl}/user`, registerDto).subscribe(
      (payload: User) => {
        console.log(payload);
        this.userService.setUser(payload);
        const signInDto = {
          username: payload.username,
          password: payload.password,
        };
        this.signInService.signIn(signInDto).subscribe(
          (payload) => {
            this.userService.setUser(payload);
          },
          console.log,
          console.log
        );
      },
      console.error,
      console.log
    );
  }
}
