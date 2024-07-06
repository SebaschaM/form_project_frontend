import { Component, OnInit } from '@angular/core';
import {
  CreateUserDto,
  ResponseUsersDto,
  ResponseWrapperDto,
  UpdateUserDto,
} from './interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  users: ResponseUsersDto | null = null;
  user: ResponseWrapperDto | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  createUser(): void {
    const createUserDto: CreateUserDto = {
      nombres: 'John',
      apellidos: 'Doe',
      edad: 25,
      direccion: '123 Main St',
      correo: 'john.doe@example.com',
      celular: '1234567890',
      fecha_nacimiento: '01/01/1990',
      estado_habilitado: true,
    };
    this.userService.createUser(createUserDto).subscribe((response) => {
      console.log('User created:', response);
      this.getAllUsers();
    });
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
      console.log('All users:', this.users);
    });
  }

  getUserById(id: string): void {
    this.userService.getUserById(id).subscribe((response) => {
      this.user = response;
      console.log('User:', this.user);
    });
  }

  updateUserState(id: string): void {
    this.userService.updateUserState(id).subscribe((response) => {
      console.log('User state updated:', response);
      this.getAllUsers();
    });
  }

  updateUser(id: string): void {
    const updateUserDto: UpdateUserDto = {
      nombres: 'Jane',
      apellidos: 'Doe',
      edad: 28,
      direccion: '456 Main St',
      correo: 'jane.doe@example.com',
      celular: '0987654321',
      fecha_nacimiento: '01/01/1995',
      estado_habilitado: true,
    };
    this.userService.updateUser(id, updateUserDto).subscribe((response) => {
      console.log('User updated:', response);
      this.getAllUsers();
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe((response) => {
      console.log('User deleted:', response);
      this.getAllUsers();
    });
  }
}
