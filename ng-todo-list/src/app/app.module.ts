import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodolistsComponent } from './todolists/todolists.component';
import { TodolistComponent } from './todolists/todolist/todolist.component';
import { ViewTodolistComponent } from './view-todolist/view-todolist.component';
import { TodoComponent } from './view-todolist/todo/todo.component';
import { MenuComponent } from './view-todolist/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    TodolistsComponent,
    ViewTodolistComponent,
    TodolistComponent,
    TodoComponent,
    MenuComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
