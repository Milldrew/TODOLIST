import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodolistsComponent } from './todolists/todolists.component';
import { TodolistComponent } from './todolists/todolist/todolist.component';
import { ViewTodolistComponent } from './view-todolist/view-todolist.component';
import { TodoComponent } from './view-todolist/todo/todo.component';
import { MenuComponent } from './view-todolist/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { MessageBoxComponent } from './message-box/message-box.component';

@NgModule({
  declarations: [
    AppComponent,
    TodolistsComponent,
    ViewTodolistComponent,
    TodolistComponent,
    TodoComponent,
    MenuComponent,
    RegisterComponent,
    SignInComponent,
    MessageBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
