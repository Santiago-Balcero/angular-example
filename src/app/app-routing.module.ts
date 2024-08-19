import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { PlayerMainComponent } from './views/player-main/player-main.component';
import { RegisterFormComponent } from './views/register-form/register-form.component';
import { AuthGuard } from '@guards/auth.guard';
import { RedirectGuard } from '@guards/redirect.guard';
import { PlayerTeamsComponent } from './views/player-teams/player-teams.component';
import { EditPlayerComponent } from './views/edit-player/edit-player.component';

const routes: Routes = [
  {path: '', title: 'Volley App - Login', component: LoginComponent, canActivate: [RedirectGuard]},
  {path: 'main', title: 'Volley App - Home', component: PlayerMainComponent, canActivate: [AuthGuard]},
  {path: 'register', title: 'Volley App - Register', component: RegisterFormComponent, canActivate: [RedirectGuard]},
  {path: 'teams', title: 'Volley App - Teams', component: PlayerTeamsComponent, canActivate: [AuthGuard]},
  {path: 'account', title: 'Volley App - Account', component: EditPlayerComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
