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
    console.log('before checkLocalStorage');
    this.userService.checkLocalStorage();
    console.log('after check local');
    if (this.userService.userData) {
      console.log('after if');
      this.username = this.userService.userData.username;
    } else {
      this.username = '';
    }
    console.log('end of init');
  }
}
