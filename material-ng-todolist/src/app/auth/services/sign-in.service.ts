import { SignInDto } from '../models/sign-in-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private readonly http: HttpClient) {}

  signIn(signInDto: SignInDto) {
    return this.http.post(`${environment.baseUrl}/auth/login`, signInDto);
  }
}
