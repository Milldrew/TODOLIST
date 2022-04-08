import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}
  loginProdUrl = `https://todolist-service-epr45towtq-uc.a.run.app/auth/login`;
  userProdUrl = `https://todolist-service-epr45towtq-uc.a.run.app/user`;
  userUrl = `http://192.168.0.143:3000/user`;
  loginUrl = `http://192.168.0.143:3000/auth/login`;
  registerUser(createUserDto: any) {
    return this.http.post(this.userProdUrl, createUserDto);
  }

  signIn(username: string, password: string) {
    try {
      return this.http.post(this.loginProdUrl, { username, password });
    } catch (error: any) {
      console.error('hello');
    }
    console.log('NULL');
    return null;
  }
}
