import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}

  userUrl = `http://192.168.0.143:3000/user`;
  loginUrl = `http://192.168.0.143:3000/auth/login`;
  registerUser(createUserDto: any) {
    return this.http.post(this.userUrl, createUserDto);
  }

  signIn(username: string, password: string) {
    return this.http
      .post(this.loginUrl, { username, password })
      .subscribe((payload) => console.log(payload));
  }
}
