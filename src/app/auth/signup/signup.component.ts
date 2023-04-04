import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthUser } from '../models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmPasswordValidator } from './../confirmPassword.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  userObj: AuthUser;
  error: string;

  constructor(
    private _fromBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _toastrService: ToastrService) {
    this.InitSignupForm();
  }

  InitSignupForm() {
    this.signupForm = this._fromBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
    },
      {
        validator: ConfirmPasswordValidator("Password", "ConfirmPassword")
      }
    );
  }

  signUp() {
    this.userObj = new AuthUser();
    this.userObj.FirstName = this.signupForm.controls["FirstName"].value;
    this.userObj.LastName = this.signupForm.controls["LastName"].value;
    this.userObj.Email = this.signupForm.controls["Email"].value;
    this.userObj.Password = this.signupForm.controls["Password"].value;
    this._authService
      .register(this.userObj)
      .pipe(first())
      .subscribe({
        next: (resp: any) => {
          this._toastrService.success('Reigstered Successfully!', 'Success!');
          this._router.navigateByUrl("/login");
        },
        error: (error: any) => {
          this.error = error;
          this._toastrService.error('Something went wrong!', 'Error!');
        },
      });
  }
}
