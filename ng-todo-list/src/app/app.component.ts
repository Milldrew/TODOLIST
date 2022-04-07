import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    public messageService: MessageService
  ) {}
  title = 'ng-todo-list';

  isAuthenticated: boolean;
  signOut() {
    this.isAuthenticated = false;
    this.userService.setIsAuthenticated(false);
    this.userService.setAuthToken(null);
    this.router.navigate(['']);
    this.messageService.displayMessage('Signed Out!');
  }
  ngAfterContentChecked() {
    this.userService.isAuthenticated$.subscribe(
      (value) => (this.isAuthenticated = value)
    );
  }
  ngOnInit() {
    this.userService.isAuthenticated$.subscribe(
      (value) => (this.isAuthenticated = value)
    );
  }
}
