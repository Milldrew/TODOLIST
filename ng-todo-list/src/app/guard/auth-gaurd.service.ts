import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGaurdService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    let isLoggedIn = this.userService.getIsAuthenticated();
    console.log('AuthGaurd canActivate called');

    if (isLoggedIn) {
      return true;
    }

    console.log('not authorized to acess page by auth gaurd');

    return false;
  }
}
