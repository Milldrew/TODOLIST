import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDto } from '../models/register-dto';
import { UserService } from 'src/app/core/services/user.service';
import { SignInService } from './sign-in.service';

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
    this.http.post(`${environment.baseUrl}/user`, registerDto).subscribe(
      (payload) => {
        console.log(payload);
        this.userService.setUser(payload);
      },
      console.error,
      console.log
    );
  }
}
