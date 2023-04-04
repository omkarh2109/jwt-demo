import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenApiModel } from '../auth/models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService, private _router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const myToken = this._authService.getToken();
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }
      });
    }
    return next.handle(request).pipe(catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          return this.handleUnAuthError(request, next);
        }
      }
      return throwError(() => new Error("Some Error occured"));
    }));
  }

  handleUnAuthError(req: HttpRequest<any>, next: HttpHandler) {
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this._authService.getToken()!;
    tokenApiModel.refreshToken = this._authService.getRefreshToken()!;
    return this._authService.renewToken(tokenApiModel).pipe(
      switchMap((data: TokenApiModel) => {
        this._authService.setRefreshToken(data.refreshToken!);
        this._authService.setToken(data.accessToken!);
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${data.accessToken}` }
        })
        return next.handle(req);
      }),
      catchError((err) => {
        return throwError(() => {
          this._router.navigate(['/login']);
        })
      })
    )
  }
}
