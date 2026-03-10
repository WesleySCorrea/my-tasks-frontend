import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user/user.service';
import { CreateUserDTO } from '../../../model/cadastro/create-user.dto';
import { InfoModalComponent } from "../../../components/modal/info-modal/info-modal.component";

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, RouterModule, InfoModalComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  showInfoModal: boolean = false;
  infoModalMessage: string = '';
  infoModalTitle: string = '';
  loading: boolean = false;
  user: CreateUserDTO = {
    name: '',
    surName: '',
    email: '',
    password: ''
  }

  constructor(private router: Router, private userService: UserService) {}

  cadastrar() {

    this.loading = true;

    this.userService.createUser(this.user)
    .subscribe({
      next: () => {

        this.infoModalTitle = 'Sucesso!';
        this.infoModalMessage = 'Usuário criado com sucesso!';
        this.showInfoModal = true;

        this.loading = false;
      },
      error: (err) => {
        this.infoModalTitle = 'Erro';
        this.infoModalMessage = 'Erro ao criar o usuário. Por favor, tente novamente!';
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
}
