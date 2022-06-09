import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  userData: User = {
    id: 1,
    username: 'foobar@gmail.com',
    password: 'foobar',
    accessToken:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2…jUwfQ.p4D_y7J8maMXLnRr28keTi24u1IdgvixkW9knMbwIqk',
  };

  setUser(userDataPayload: any) {
    console.log('before set', userDataPayload);
    this.userData = Object.assign(userDataPayload);
    console.log('after set', userDataPayload);
  }
}
