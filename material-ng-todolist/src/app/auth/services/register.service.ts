import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDto } from '../models/register-dto';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private readonly http: HttpClient) {}

  register(registerDto: RegisterDto) {
    this.http
      .post(registerDto, {
        username: 'FROM MATERIAL CLIENT',
        password: 'PASSWORD FROM MATERIAL CLIENT',
      })
      .subscribe(console.log, console.error, console.log);
  }
}
