import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginRequest } from '../../model/login/login-request.dto';
import { AuthService } from '../../core/services/auth/auth.service';
import { StorageService } from '../../core/services/storage/storage.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loading: boolean = false;
  loginRequest: LoginRequest = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {}


  login() {

    this.loading = true;

    this.authService.login(this.loginRequest)
      .subscribe({
        next: (response) => {

          this.storageService.setAuthData(response);
          this.loading = false;

          this.router.navigate(['/']);
        },
        error: (err) => {
          alert('Erro ao fazer o login, tente novamente.')
          this.loading = false;
        }
      });
  }
}
