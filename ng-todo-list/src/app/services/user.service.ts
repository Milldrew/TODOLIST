import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAuthenticated: boolean = false;
  constructor() {}

  setIsAuthenticated(boolean: boolean): boolean {
    this.isAuthenticated = boolean;
    return this.isAuthenticated;
  }
  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
