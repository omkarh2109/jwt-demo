import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /**
   *
   */
  constructor(private _router: Router, private _authService: AuthService) {

  }

  logout() {
    console.log('logout');
    this._authService.logout();
    this._router.navigateByUrl("/auth/login");
  }
}
