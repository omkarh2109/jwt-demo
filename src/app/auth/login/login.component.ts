import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthUser } from '../models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { AppService } from 'src/app/services/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  userObj: AuthUser;
  error: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _appService: AppService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
    this.InitLoginForm();
  }

  InitLoginForm() {
    this.loginForm = this._formBuilder.group({
      Email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Password: ['', Validators.required],
    });
  }

  login() {
    // this._router.navigateByUrl("/dashboard/default");
    this.userObj = new AuthUser();
    this.userObj.Email = this.loginForm.controls["Email"].value;
    this.userObj.Password = this.loginForm.controls["Password"].value;
    this._authService
      .authenticate(this.userObj)
      .pipe(first())
      .subscribe({
        next: (resp: any) => {
          console.log(resp);
          this._authService.setToken(resp.accessToken);
          this._authService.setRefreshToken(resp.refreshToken);
          const tokenPayload = this._authService.decodedToken();
          this._appService.setFullNameForStore(tokenPayload.name);
          this._appService.setRoleForStore(tokenPayload.role);
          this._router.navigateByUrl("/dashboard/default");
        },
        error: (error: any) => {
          this.error = error;
        },
      });
  }
}
