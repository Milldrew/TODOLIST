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
  username: string;
  signOut() {
    this.userService.deleteLocalToken();
  }

  ngOnInit() {
    this.userService.checkLocalStorage();

    this.username = this.userService.userData.username;
    console.log('userdata', this.userService.userData);
  }
}
