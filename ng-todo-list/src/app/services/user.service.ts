import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAuthenticated: boolean = true;
  constructor() {}

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
