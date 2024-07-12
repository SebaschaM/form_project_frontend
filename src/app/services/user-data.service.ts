// src/app/services/user-data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponseUsersDto } from '../user/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private usersSubject = new BehaviorSubject<ResponseUsersDto | null>(null);
  users$ = this.usersSubject.asObservable();

  setUsers(users: ResponseUsersDto) {
    this.usersSubject.next(users);
  }

  getUsers(): ResponseUsersDto | null {
    return this.usersSubject.value;
  }
}
