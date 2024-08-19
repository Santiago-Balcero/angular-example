import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "@environments/environment";
import { TokenService } from "@services/token.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  loginUrlApi: string = `${environment.API_URL}/auth`;

  login(email: string, password: string): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    return this.http.post<{access_token: string, refresh_token: string}>(`${this.loginUrlApi}/login`, formData).pipe(
      // tap operator doesn't changes any workflow done with this observable,
      // it only makes an operation before sending data to subscribers
      tap((result) => {
        console.log(result);
        this.tokenService.setToken(result.access_token);
        this.tokenService.setRefreshToken(result.refresh_token);
      })
    );
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post<{accessToken: string, refreshToken: string}>(`${this.loginUrlApi}/refresh-token`, {'refresh_token': refreshToken}).pipe(
      tap((result) => {
        console.log(result);
        this.tokenService.setToken(result.accessToken);
        this.tokenService.setRefreshToken(result.refreshToken);
      })
    );
  }

}