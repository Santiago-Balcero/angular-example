import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpContextToken, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { TokenService } from '@services/token.service';
import { AuthService } from '@services/auth.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken(): HttpContext {
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor (private tokenService: TokenService, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.context.get(CHECK_TOKEN)) {
      // Checks if accessToken is valid
      if (this.tokenService.isValidToken()) {
        return this.addToken(req, next);
      }
      // Enters else if accessToken has expired
      else {
        return this.updateTokens(req, next);
      }
    }
    return next.handle(req);
  }

  private addToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    if (token) {
      const cloned = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
      console.log('Interceptor for JWT');
      console.log(req);
      return next.handle(cloned);
    }
    else {
      console.log('Interceptor');
      return next.handle(req);
    }
  }

  private updateTokens(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken = this.tokenService.getRefreshToken();
    const refreshTokenIsValid = this.tokenService.isValidRefreshToken();
    if (refreshToken && refreshTokenIsValid) {
      return this.authService.refreshToken(refreshToken).pipe(
        switchMap(() => this.addToken(req, next))
      )
    }
    return next.handle(req);
  }

}