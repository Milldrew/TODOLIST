import { Component, ElementRef, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public appRootEl: ElementRef,
    private readonly userService: UserService
  ) {}
  username: string;
  signOut() {
    this.userService.deleteLocalToken();
  }

  ngOnInit() {
    this.userService.checkLocalStorage();
    if (this.userService.userData) {
      let firstLetter = this.userService.userData.username[0];
      this.username =
        firstLetter.toUpperCase() +
        this.userService.userData.username.slice(1, 13);
    } else {
      this.username = 'Todo List App';
    }
  }
}
