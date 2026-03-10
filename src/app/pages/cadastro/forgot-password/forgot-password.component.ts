import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ForgotPasswordRequest } from '../../../model/forgot-password/forgot-password.dto';
import { InfoModalComponent } from "../../../components/modal/info-modal/info-modal.component";

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule, RouterModule, InfoModalComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  showInfoModal: boolean = false;
  infoModalMessage: string = '';
  infoModalTitle: string = '';
  loading = false;
  email: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  enviarEmail() {

    this.loading = true;

    const request: ForgotPasswordRequest = {
      email: this.email
    };

    this.authService.forgotPassword(request).subscribe({
      next: () => {

        this.infoModalTitle = 'Sucesso!';
        this.infoModalMessage = 'Se o email estiver cadastrado, você receberá instruções para redefinir sua senha.';
        this.showInfoModal = true;

        this.loading = false;
      },
      error: () => {
        this.infoModalTitle = 'Erro';
        this.infoModalMessage = 'Erro ao enviar email.';
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
}
