import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthGaurdService } from './guard/auth-gaurd.service';
import { TodolistsComponent } from './todolists/todolists.component';
import { ViewTodolistComponent } from './view-todolist/view-todolist.component';

//{ path: '', redirectTo: 'lists', pathMatch: 'full' },
const routes: Routes = [
  { path: '', component: SignInComponent },
  {
    path: 'lists',
    component: TodolistsComponent,
    canActivate: [AuthGaurdService],
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'list/:id',
    component: ViewTodolistComponent,

    canActivate: [AuthGaurdService],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
