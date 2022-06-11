import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  userData: User;

  setUser(userDataPayload: any) {
    this.userData = Object.assign(this.userData || {}, userDataPayload);
    localStorage.setItem('userData', JSON.stringify(this.userData));
  }
  checkLocalStorage() {
    const user = localStorage.getItem('userData');
    if (user) {
      this.userData = JSON.parse(user);
    }
  }

  deleteLocalToken() {
    const user = localStorage.removeItem('userData');

    Object.assign(this.userData, { username: '', accessToken: '', id: 0 });
  }
}
