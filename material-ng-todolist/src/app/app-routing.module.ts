import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayListsComponent } from './display-lists/display-lists.component';
import { ViewListComponent } from './display-lists/view-list/view-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'todo-lists', pathMatch: 'full' },
  /*
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  */
  { path: 'todo-lists', component: DisplayListsComponent },
  { path: 'todo-lists/todo-list/:code', component: ViewListComponent },
  { path: '**', redirectTo: 'register' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
