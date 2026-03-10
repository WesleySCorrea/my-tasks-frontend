import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-info',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-info.component.html',
  styleUrl: './task-info.component.scss'
})
export class TaskInfoComponent {

  @Input() task: any;

  @Output() delete = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();
  @Output() finish = new EventEmitter<void>();
  @Output() reopen = new EventEmitter<void>();

  statusClass(status: string) {
    switch(status) {
      case 'ABERTA': return 'text-dark';
      case 'CONCLUIDA': return 'bg-success';
      case 'ATRASADA': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}
