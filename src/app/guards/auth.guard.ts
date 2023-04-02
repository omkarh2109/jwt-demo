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
    
    // let url: string = route.path;
    // console.log('Url:'+ url);
    // if (url=='admin') {
    //   alert('You are not authorised to visit this page');
    //   return false;
    // }  
    // return true; 
    if (this._authService.isUserLoggedIn())  {
      //redirect to login/home page etc
      //return false to cancel the navigation
      //let url: string = route.path;
      // return this._authService.isLoggedIn$;
      return true;
    } else {
      this._router.navigate(['/auth/login']);
      return false;
    }
  }
 

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
      //check some condition  
      if (this._authService.isUserLoggedIn())  {
        //redirect to login/home page etc
        //return false to cancel the navigation
        //const url = state.url;
        // return this._authService.isLoggedIn$;
        return true;
      } else {
        this._router.navigate(['/auth/login']);
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
