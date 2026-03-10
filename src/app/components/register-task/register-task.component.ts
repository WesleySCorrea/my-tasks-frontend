import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateTaskDTO } from '../../model/tasks/create-task.dto';
import { TaskService } from '../../core/services/task/task.service';
import { InfoModalComponent } from "../modal/info-modal/info-modal.component";

@Component({
  selector: 'app-register-task',
  imports: [CommonModule, FormsModule, InfoModalComponent],
  templateUrl: './register-task.component.html',
  styleUrl: './register-task.component.scss'
})
export class RegisterTaskComponent {

  constructor(private taskService: TaskService) {}

  showInfoModal: boolean = false;
  infoModalMessage: string = '';
  infoModalTitle: string = '';
  loading: boolean = false;
  task: CreateTaskDTO = {
    title: '',
    description: '',
    priority: 'BAIXA',
    deadline: this.getToday()
  };

  getToday(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onSubmit() {

    this.loading = true;

    this.taskService.createTask(this.task)
      .subscribe({
        next: () => {

          this.infoModalTitle = 'Sucesso!';
          this.infoModalMessage = 'Tarefa criada com sucesso!';
          this.showInfoModal = true;

          this.loading = false;

          this.task = {
            title: '',
            description: '',
            priority: 'BAIXA',
            deadline: this.getToday()
          };
        },
        error: (err) => {
            this.infoModalTitle = 'Erro';
          this.infoModalMessage = 'Erro ao criar task, por favor tente novamente!';
          this.showInfoModal = true;

          this.loading = false;
        }
      });
  }

  onInfoModalClose() {
    this.showInfoModal = false;
  }
}
