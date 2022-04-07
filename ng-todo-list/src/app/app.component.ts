import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private userService: UserService, private router: Router) {}
  title = 'ng-todo-list';

  isAuthenticated: boolean;
  signOut() {
    this.isAuthenticated = false;
    this.userService.setIsAuthenticated(false);
    this.userService.setAuthToken(null);
    this.router.navigate(['']);
  }
  ngAfterContentChecked() {
    this.userService.isAuthenticated$.subscribe(
      (value) => (this.isAuthenticated = value)
    );
    console.table({ isAuth: this.isAuthenticated });
  }
  ngOnInit() {
    this.userService.isAuthenticated$.subscribe(
      (value) => (this.isAuthenticated = value)
    );
  }
}
