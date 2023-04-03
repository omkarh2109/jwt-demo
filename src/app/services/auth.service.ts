import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthUser } from './../auth/models/auth.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenApiModel } from '../auth/models/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();
  redirectUrl: string = environment.redirectUrl;
  private userPayload: any;

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * 
   * @param userObj 
   */
  authenticate(userObj: AuthUser) {
    this.isLoggedIn.next(true);
    return this._httpClient.post<any>(`${environment.apiUrl}auth/authenticate`, userObj);
  }

  /**
   * 
   * @param userObj 
   */
  register(userObj: AuthUser) {
    return this._httpClient.post<any>(`${environment.apiUrl}auth/register`, userObj);
  }

  /**
   * 
   * @param userObj 
   */
  forgetPassword(userObj: AuthUser) {

  }

  /**
   * 
   */
  logout(): Observable<boolean> {
    this.isLoggedIn.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.clear();
    return this.isLoggedIn$;
  }

  /**
   * 
   * @param tokenValue 
   */
  setToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  /**
   * 
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * 
   * @param tokenValue 
   */
  setRefreshToken(tokenValue: string) {
    
    localStorage.setItem('refreshToken', tokenValue);
  }

  /**
   * 
   */
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }


  /**
   * 
   */
  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * 
   */
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    const decodeToekn = jwtHelper.decodeToken(token);
    return decodeToekn;
  }

  /**
   * 
   */
  getFullNameFromToken() {
    if (this.userPayload) {
      return this.userPayload.name;
    }
  }

  /**
   * 
   */
  getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload.role;
    }
  }

  renewToken(tokenApi: TokenApiModel) {
    return this._httpClient.post<any>(`${environment.apiUrl}auth/refresh`, tokenApi);
  }

  getAllUsers() {
    return this._httpClient.get<any>(`${environment.apiUrl}auth/GetAllUsers`);
  }

}
