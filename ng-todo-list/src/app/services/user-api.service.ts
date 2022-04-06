import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}

  userUrl = `http://192.168.0.143:3000/user`;
  registerUser(createUserDto: any) {
    return this.http.post(this.userUrl, createUserDto);
  }
}
