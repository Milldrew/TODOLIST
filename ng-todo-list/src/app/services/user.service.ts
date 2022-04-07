import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAuthenticated: boolean = false;
  isAuthenticated$: Observable<boolean> = of(false);
  token: string | null = null;
  constructor() {}

  setAuthToken(token: string | null) {
    let prefix = 'Bearer ';
    this.token = prefix + token;
    return this.token;
  }
  setIsAuthenticated(boolean: boolean): boolean {
    this.isAuthenticated = boolean;
    this.isAuthenticated$ = of(boolean);
    return this.isAuthenticated;
  }
  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
