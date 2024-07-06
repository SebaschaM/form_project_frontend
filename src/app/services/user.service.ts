import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateUserDto,
  UpdateUserDto,
  BaseResponseUserDto,
  ResponseUsersDto,
  ResponseWrapperDto,
} from '../user/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user'; // Asegúrate de que la URL coincida con la de tu API

  constructor(private http: HttpClient) {}

  createUser(createUserDto: CreateUserDto): Observable<BaseResponseUserDto> {
    return this.http.post<BaseResponseUserDto>(
      `${this.apiUrl}/create-user`,
      createUserDto
    );
  }

  getAllUsers(): Observable<ResponseUsersDto> {
    return this.http.get<ResponseUsersDto>(`${this.apiUrl}/get-all-users`);
  }

  getUserById(id: string): Observable<ResponseWrapperDto> {
    return this.http.get<ResponseWrapperDto>(`${this.apiUrl}/${id}`);
  }

  updateUserState(id: string): Observable<BaseResponseUserDto> {
    return this.http.put<BaseResponseUserDto>(
      `${this.apiUrl}/update-state/${id}`,
      {}
    );
  }

  updateUser(
    id: string,
    updateUserDto: UpdateUserDto
  ): Observable<BaseResponseUserDto> {
    return this.http.patch<BaseResponseUserDto>(
      `${this.apiUrl}/update-user/${id}`,
      updateUserDto
    );
  }

  deleteUser(id: string): Observable<BaseResponseUserDto> {
    return this.http.delete<BaseResponseUserDto>(
      `${this.apiUrl}/delete-user/${id}`
    );
  }
}
