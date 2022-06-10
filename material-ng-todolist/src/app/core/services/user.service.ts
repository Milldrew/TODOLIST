import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  userData: User;

  setUser(userDataPayload: any) {
    console.log('before set', userDataPayload);
    this.userData = Object.assign(this.userData, userDataPayload);
    localStorage.setItem('userData', JSON.stringify(this.userData));
    console.log('after set', userDataPayload);
  }
  checkLocalStorage() {
    const user = localStorage.getItem('userData');
    if (user) {
      this.userData = JSON.parse(user);
    }
  }
}
