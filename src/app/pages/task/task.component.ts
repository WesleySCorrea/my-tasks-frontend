import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskInfo } from '../../model/tasks/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../core/services/task/task.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { TaskInfoComponent } from "../../components/task-info/task-info.component";
import { ConfirmModalComponent } from "../../components/modal/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-task',
  imports: [NavbarComponent, TaskInfoComponent, CommonModule, ConfirmModalComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  
  showModal: any;
  modalMessage: string = '';
  actionType: 'delete' | 'finish' | 'reopen' | 'update' | null = null;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) {}

  taskId!: number;
  task! : TaskInfo;

  ngOnInit() {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTask();
  }

  loadTask() {
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.task = task;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  
  openDeleteModal() {
    this.modalMessage = 'Deseja realmente excluir esta tarefa?';
    this.actionType = 'delete';
    this.showModal = true;
  }

  openFinishModal() {
    this.modalMessage = 'Deseja realmente concluir esta tarefa?';
    this.actionType = 'finish';
    this.showModal = true;
  }

  openReopenModal() {
    this.modalMessage = 'Deseja realmente reabrir esta tarefa?';
    this.actionType = 'reopen';
    this.showModal = true;
  }

  openUpdateModal() {
    this.modalMessage = 'Deseja salvar as alterações?';
    this.actionType = 'update';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmAction() {

    switch (this.actionType) {

      case 'delete':
        this.deleteTask();
        break;

      case 'finish':
        this.finishTask();
        break;

      case 'reopen':
        this.reopenTask();
        break;

      case 'update':
        this.updateTask();
        break;
    }
    
    this.closeModal();
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskId).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  updateTask() {
    this.taskService.updateTask(this.taskId, this.task).subscribe(() => {
      this.loadTask();
    });
  }

  finishTask() {
    this.taskService.completeTask(this.taskId).subscribe(() => {
      this.loadTask();
    });
  }

  reopenTask() {
    this.taskService.reopenTask(this.taskId).subscribe(() => {
      this.loadTask();
    });
  }
}
