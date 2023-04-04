import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './services/app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { ToastrModule } from 'ngx-toastr'
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DashboardModule,
    HttpClientModule,
    JwtModule,
    ToastrModule.forRoot({
      timeOut: 15000, // 15 seconds
      closeButton: true,
      progressBar: true,
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AppService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
