import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ResetPasswordRequest } from '../../../../model/reset-password/reset-password.dto';
import { InfoModalComponent } from "../../../../components/modal/info-modal/info-modal.component";

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, RouterModule, InfoModalComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{

  showInfoModal: boolean = false;
  infoModalMessage: string = '';
  infoModalTitle: string = '';
  token!: string;
  loading: boolean = false;
  password: string = '';
  newPassword: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token')!;
  }

  resetPassword() {

    this.loading = true;

    const request: ResetPasswordRequest = {
      token: this.token,
      newPassword: this.password
    };
            console.log(request)  

    this.authService.resetPassword(request).subscribe({
      next: () => {
        this.infoModalTitle = 'Sucesso!';
        this.infoModalMessage = 'Senha redefinida com sucesso!';
        this.showInfoModal = true;

        this.loading = false;
      },
      error: () => {
        this.infoModalTitle = 'Erro';
        this.infoModalMessage = 'Token inválido ou expirado.';
        this.showInfoModal = true;

        this.loading = false;
      }
    });
  }

  onInfoModalClose() {
    this.showInfoModal = false;
      
    if (this.infoModalTitle === 'Sucesso!') {
      this.router.navigate(['/login']);
    }
  }

  hasUppercase(value: string): boolean {
    return /[A-Z]/.test(value);
  }

  hasLowercase(value: string): boolean {
    return /[a-z]/.test(value);
  }

  hasNumber(value: string): boolean {
    return /\d/.test(value);
  }

  passwordsMatch(): boolean {
    return this.password === this.newPassword;
  }
}
