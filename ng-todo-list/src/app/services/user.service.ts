import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAuthenticated: Observable<boolean> = of(false);
  constructor() {}
}
