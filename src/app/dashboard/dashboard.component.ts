import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /**
   *
   */
  constructor(private _router: Router, private _authService: AuthService, private jwtHelper: JwtHelperService) {

  }

  ngOnInit(){
    this.checkTokenStauts();
    this.getAllUsers();
  }

  getAllUsers(){
    this._authService.getAllUsers().subscribe(resp=>{
      const data = resp;
      console.log(data);
    });
  }

  checkTokenStauts(){
    const token = this._authService.getToken();
    if (this.jwtHelper.isTokenExpired(token)) {
      console.log("Token Expired");
    } else {
      console.log("Token Not Expired");
    }
  }

  logout() {
    console.log('logout');
    this._authService.logout();
    this._router.navigateByUrl("/auth/login");
  }
}
