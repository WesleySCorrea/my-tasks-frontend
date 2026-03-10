import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskBasic } from '../../model/tasks/task.model';
import { TaskService } from '../../core/services/task/task.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-task',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.scss'
})
export class ListTaskComponent {//implements OnInit {

  now = Date.now();
  @Input() tasks: TaskBasic[] = [];
  @Output() finish = new EventEmitter<TaskBasic>();
  @Output() delete = new EventEmitter<TaskBasic>();

  constructor(taskService: TaskService) {}

  editTask(task: TaskBasic) {
    // Aqui você pode abrir um modal ou navegar para edição
    console.log('Editar task', task);
  }

  priorityClass(priority: string) {
    switch(priority) {
      case 'ALTA': return 'text-danger';
      case 'MEDIA': return 'text-warning';
      case 'BAIXA': return 'text-success';
      default: return '';
    }
  }

  statusClass(status: string): string {
    switch (status) {
      case 'CONCLUIDA':
        return 'text-success fw-bold';
      case 'ATRASADA':
        return 'text-danger fw-bold';
      case 'ABERTA':
      default:
        return 'fw-bold';
    }
  }
}
