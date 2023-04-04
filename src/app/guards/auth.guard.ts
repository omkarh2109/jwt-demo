import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  someCondition:boolean;
  constructor(private _router:Router, private _authService: AuthService ) {
  }

  canLoad(route: Route): boolean {
    if (this._authService.isUserLoggedIn())  {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
 

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
      //check some condition
      const decodecToken = this._authService.decodedToken();
      console.log("decodedToken in Auth Guards", decodecToken);
      console.log("this._authService.isUserLoggedIn()",this._authService.isUserLoggedIn());
      if (this._authService.isUserLoggedIn())  {
        return true;
      } else {
        this._router.navigate(['/login']);
        return false;
      }
  }

  checkLogin(url: string): Observable<boolean> {
    if (this._authService.isUserLoggedIn())  {
      return this._authService.isLoggedIn$;
    } else {
      this._authService.redirectUrl = url;
      return this._authService.isLoggedIn$;
    }
  }

}
