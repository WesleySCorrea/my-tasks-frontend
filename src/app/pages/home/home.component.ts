import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TaskBasic } from '../../model/tasks/task.model';
import { TaskFilter } from '../../model/tasks/filter-task.dto';
import { TaskService } from '../../core/services/task/task.service';
import { PaginationState } from '../../model/page/pagination-state.dto';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { ListTaskComponent } from "../../components/list-task/list-task.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { ConfirmModalComponent } from "../../components/modal/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    ListTaskComponent,
    SearchComponent,
    PaginationComponent,
    CommonModule,
    ConfirmModalComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  actionType: 'finish' | 'delete' | null = null;
  modalMessage: string = '';
  selectedTask!: TaskBasic;
  showModal: any;
  paginationState!: PaginationState;
  tasks: TaskBasic[] = [];
  currentFilter: TaskFilter = {
  };

  ngOnInit(): void {
    this.loadTasks();
  }

  onSearch(filter: TaskFilter) {
    this.currentFilter = filter;

    this, this.loadTasks(0);
  }

  loadTasks(page: number = 0) {

    this.taskService
      .getTasks(this.currentFilter, page)
      .subscribe(response => {

        this.paginationState = response;
        this.tasks = response.content;
      });
  }

  onPageChange(page: number) {
    this.loadTasks(page);
  }

  openFinishModal(task: TaskBasic) {
    this.selectedTask = task;
    this.actionType = 'finish';
    this.modalMessage = 'Deseja realmente concluir esta tarefa?';
    this.showModal = true;
  }

  openDeleteModal(task: TaskBasic) {
    this.selectedTask = task;
    this.actionType = 'delete';
    this.modalMessage = 'Deseja realmente excluir esta tarefa?';
    this.showModal = true;
  }

  confirmAction() {
    if (this.actionType === 'finish') {
      this.finishTask();
    } else if (this.actionType === 'delete') {
      this.deleteTask();
    }
  }

  finishTask() {

    this.taskService.completeTask(this.selectedTask.id)
      .subscribe({
        next: () => {
          this.showModal = false;
          this.loadTasks();
        },
        error: (err) => {
          alert("Erro ao concluir a tarefa.");
          this.showModal = false;
        }
      });
  }

  deleteTask() {
    this.taskService.deleteTask(this.selectedTask.id)
      .subscribe({
        next: () => {
          this.showModal = false;
          this.loadTasks();
        },
        error: () => {
          alert("Erro ao excluir a tarefa.");
          this.showModal = false;
        }
      });

  }

  closeModal() {
    this.showModal = false;
  }
}
