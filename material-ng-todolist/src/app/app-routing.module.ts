import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { DisplayListsComponent } from './display-lists/display-lists.component';
import { ViewListComponent } from './display-lists/view-list/view-list.component';
import { OgpComponent } from './ogp/ogp.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'todo-lists', component: DisplayListsComponent },
  { path: 'ogp', component: OgpComponent },
  { path: 'todo-lists/todo-list/:id', component: ViewListComponent },
  { path: '**', redirectTo: 'register' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
