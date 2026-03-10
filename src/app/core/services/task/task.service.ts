import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageResponse } from '../../../model/page/page.model';
import { environment } from '../../../environments/environment';
import { TaskFilter } from '../../../model/tasks/filter-task.dto';
import { UpdateTaskDTO } from '../../../model/tasks/update-task.dto';
import { CreateTaskDTO } from '../../../model/tasks/create-task.dto';
import { TaskBasic, TaskInfo } from '../../../model/tasks/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private API = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) { }

  createTask(task: CreateTaskDTO): Observable<any> {
    return this.http.post(this.API, task);
  }

  getTasks(filter: TaskFilter, page: number) {

    let params = new HttpParams()
      .set('page', page)

    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value.toString().trim() !== '') {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<PageResponse<TaskBasic>>(this.API, { params });
  }

  getTaskById(id: number) {
    return this.http.get<TaskInfo>(`${this.API}/${id}`);
  }

  completeTask(taskId: number) {
    return this.http.patch(`${this.API}/${taskId}/complete`, null);
  }

  reopenTask(taskId: number) {
    return this.http.patch(`${this.API}/${taskId}/reopen`, null);
  }

  deleteTask(taskId: number) {
    return this.http.delete(`${this.API}/${taskId}`);
  }

  updateTask(taskId: number, task: UpdateTaskDTO) {
    return this.http.patch<void>(`${this.API}/${taskId}`, task);
  }
}
