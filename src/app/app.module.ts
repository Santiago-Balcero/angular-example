import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { LoginComponent } from './views/login/login.component';
import { PlayerMainComponent } from './views/player-main/player-main.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterFormComponent } from './views/register-form/register-form.component';
import { PlayerTeamsComponent } from './views/player-teams/player-teams.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { EditPlayerComponent } from './views/edit-player/edit-player.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    LoginComponent,
    PlayerMainComponent,
    RegisterFormComponent,
    PlayerTeamsComponent,
    StarRatingComponent,
    EditPlayerComponent,
    LoaderComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    HttpClientModule,
    DropdownModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
