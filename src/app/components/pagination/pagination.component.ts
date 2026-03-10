import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationState } from '../../model/page/pagination-state.dto';

@Component({
  selector: 'app-pagination',
  imports: [ CommonModule ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() paginationState!: PaginationState;
  @Output() pageChange = new EventEmitter<number>();

  changePage(page: number) {
    if (page >= 0 && page <= this.paginationState.totalPages) {
      this.pageChange.emit(page);
    }
  }

  get start(): number {
    if (!this.paginationState) return 0;

    return (this.paginationState.number * this.paginationState.size) + 1;
  }

  get end(): number {
    if (!this.paginationState) return 0;

    return this.start + this.paginationState.numberOfElements - 1;
  }
}
