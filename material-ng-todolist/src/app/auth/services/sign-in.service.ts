import { SignInDto } from '../models/sign-in-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IncomingUser, User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(
    private readonly http: HttpClient,
    private userService: UserService
  ) {}

  signIn(signInDto: SignInDto, router: Router) {
    console.log(environment.baseUrl);
    console.log({ signInDto });
    return this.http.post<User>(`${environment.baseUrl}/auth/login`, signInDto);
  }
}
