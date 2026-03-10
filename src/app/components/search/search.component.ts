import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskFilter } from '../../model/tasks/filter-task.dto';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  
  isFilterOpen = false;

  @Output() search = new EventEmitter<TaskFilter>();

  filter: TaskFilter = {
    userId: 1,
    title: '',
    priority: '',
    status: '',
    deadline: ''
  };

  toggleFilters() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  onSearch() {

    if (window.innerWidth < 768) {
      this.isFilterOpen = false;
    }

    const cleanFilter: TaskFilter = {
      ...this.filter,
      title: this.filter.title?.trim() || undefined,
      priority: this.filter.priority || undefined,
      status: this.filter.status || undefined,
      deadline: this.filter.deadline || undefined,
    };

    this.search.emit(cleanFilter);
  }
}
