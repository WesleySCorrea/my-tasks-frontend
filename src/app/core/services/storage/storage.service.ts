import { Injectable } from '@angular/core';
import { LoginResponse } from '../../../model/login/login-response.dto';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private ACCESS_TOKEN = 'accessToken';
  private REFRESH_TOKEN = 'refreshToken';
  private USER_NAME = 'userName';

  setAuthData(response: LoginResponse): void {
    localStorage.setItem(this.ACCESS_TOKEN, response.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, response.refreshToken);
    localStorage.setItem(this.USER_NAME, response.userName);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  getUserName(): string | null {
    return localStorage.getItem(this.USER_NAME);
  }

  clear(): void {
    localStorage.clear();
  }
}
