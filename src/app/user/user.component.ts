import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, NgIconsModule, provideIcons } from '@ng-icons/core';
import {
  heroEye,
  heroPencil,
  heroAdjustmentsVertical,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import {
  CreateUserDto,
  ResponseUsersDto,
  ResponseWrapperDto,
  UpdateUserDto,
} from './interfaces/user';
import { UserService } from '../services/user.service';

type ActionMethod = 'view' | 'update' | 'toggleState' | 'delete' | 'create';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './user.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  viewProviders: [
    provideIcons({ heroEye, heroPencil, heroAdjustmentsVertical, heroTrash }),
  ],
})
export class UserComponent implements OnInit {
  users: ResponseUsersDto | null = null;
  user: ResponseWrapperDto | null = null;

  headers: string[] = [
    'Nombres',
    'Apellidos',
    'Edad',
    'Correo',
    'Celular',
    'Estado Habilitado',
    'Acciones',
  ];

  actions = [
    {
      name: 'Ver detalle',
      icon: 'heroEye',
      color: 'bg-green-500',
      method: 'view',
    },
    {
      name: 'Actualizar cliente',
      icon: 'heroPencil',
      color: 'bg-yellow-500',
      method: 'update',
    },
    {
      name: 'Cambiar estado',
      icon: 'heroAdjustmentsVertical',
      color: 'bg-purple-500',
      method: 'toggleState',
    },
    {
      name: 'Eliminar cliente',
      icon: 'heroTrash',
      color: 'bg-red-500',
      method: 'delete',
    },
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
      console.log('All users:', this.users);
    });
  }

  handleAction(action: string, id?: string): void {
    console.log(`Abriendo modal para ${action}${id ? ` con ID ${id}` : ''}`);
  }
}
