import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAuthenticated: boolean = true;
  token: string | null = null;
  constructor() {}

  setAuthToken(token: string): string {
    this.token = token;
    return this.token;
  }
  setIsAuthenticated(boolean: boolean): boolean {
    this.isAuthenticated = boolean;
    return this.isAuthenticated;
  }
  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
