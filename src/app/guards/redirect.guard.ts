import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor (private router: Router, private tokenService: TokenService) { }
  
  canActivate(): boolean {
    if (this.tokenService.isValidRefreshToken()) {
      console.log('Guard working... session is active.');
      this.router.navigate(['main']);
      return false;
    }
    return true;
  }
  
}
