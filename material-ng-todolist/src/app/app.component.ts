import { Component, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'material-ng-todolist';
  constructor(private readonly userService: UserService) {}
  userName: string;

  ngOnInit() {
    this.userService.checkLocalStorage();
    if (this.userService.userData.username) {
      this.userName = this.userService.userData.username;
    }
  }
}
