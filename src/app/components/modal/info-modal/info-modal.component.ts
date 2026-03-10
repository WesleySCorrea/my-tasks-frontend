import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info-modal',
  imports: [CommonModule],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.scss'
})
export class InfoModalComponent {

  @Input() showModal: boolean = false;
  @Input() modalTitle?: string;
  @Input() modalMessage: string = '';
  @Output() close = new EventEmitter<void>();
}
