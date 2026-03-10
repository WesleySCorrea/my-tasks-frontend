import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../core/services/storage/storage.service';
import { ConfirmModalComponent } from "../modal/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, ConfirmModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  userName: string = '';
  showModal: any;
  modalMessage: string = 'Deseja realmente sair? 😢';

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit() {
    const name = this.storageService.getUserName();
    this.userName = name ? name : '';
  }

  openLogoutModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  logout() {
    this.storageService.clear();
    this.router.navigate(['login']);
  }
}
