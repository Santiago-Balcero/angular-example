import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import jwtDecode, { JwtPayload } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token: string): void {
    setCookie('token', token, {expires: 30, path: ''});
    this.setPlayerId();
  }

  getToken(): string {
    return getCookie('token')!;
  }

  setRefreshToken(refreshToken: string): void {
    setCookie('refresh-token', refreshToken, {expires: 30, path: ''});
  }

  getRefreshToken(): string {
    return getCookie('refresh-token')!;
  }

  setPlayerId(): void {
    const token = this.getToken();
    const tokenInfo: JwtPayload = jwtDecode(token);
    setCookie('playerId', tokenInfo.sub, {expires: 30, path: ''});
  }

  getPlayerId(): string {
    return getCookie('playerId')!;
  }

  clearData(): void {
    removeCookie('token');
    removeCookie('playerId');
    removeCookie('refresh-token');
    console.log('Session cookies were cleared.');
  }

  isValidToken(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const tokenInfo: JwtPayload = jwtDecode(token);
    if (token && tokenInfo.exp) {
      const tokenExpirationDate = new Date(0);
      tokenExpirationDate.setUTCSeconds(tokenInfo.exp);
      const now = new Date();
      return tokenExpirationDate.getTime() > now.getTime();  
    }
    return false;
  }

  isValidRefreshToken(): boolean {
    const token = this.getRefreshToken();
    if (!token) {
      return false;
    }
    const tokenInfo: JwtPayload = jwtDecode(token);
    if (token && tokenInfo.exp) {
      const tokenExpirationDate = new Date(0);
      tokenExpirationDate.setUTCSeconds(tokenInfo.exp);
      const now = new Date();
      return tokenExpirationDate.getTime() > now.getTime();  
    }
    return false;
  }

}
