import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../../../model/login/login-request.dto';
import { LoginResponse } from '../../../model/login/login-response.dto';
import { LoginRefreshRequest } from '../../../model/login/login-refres-request.dto';
import { ResetPasswordRequest } from '../../../model/reset-password/reset-password.dto';
import { ForgotPasswordRequest } from '../../../model/forgot-password/forgot-password.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/login`, loginRequest);
  }

  loginWithRefresh(refreshRequest: LoginRefreshRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/refresh`, refreshRequest);
  }

  forgotPassword(forgotPasswordRequest: ForgotPasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.API}/forgot-password`, forgotPasswordRequest);
  }

  resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.API}/reset-password`, resetPasswordRequest);
  }
}
