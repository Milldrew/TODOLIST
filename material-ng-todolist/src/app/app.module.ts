import { OverlayModule } from '@angular/cdk/overlay';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisplayListsComponent } from './display-lists/display-lists.component';
import { ViewListComponent } from './display-lists/view-list/view-list.component';
import { AuthModule } from './auth/auth.module';
import { AddListOverlayComponent } from './display-lists/add-list-overlay/add-list-overlay.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RenameOverlayComponent } from './display-lists/rename-overlay/rename-overlay.component';
import { ClickStopPropagationDirective } from './core/directives/click-stop-propagation.directive';

@NgModule({
  declarations: [
    AppComponent,
    DisplayListsComponent,
    ViewListComponent,
    AddListOverlayComponent,
    RenameOverlayComponent,
    ClickStopPropagationDirective,
  ],
  imports: [
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    OverlayModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
