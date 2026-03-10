import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreateUserDTO } from '../../../model/cadastro/create-user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  createUser(user: CreateUserDTO): Observable<any> {
    return this.http.post(this.API, user);
  }
}
