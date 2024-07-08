import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ResponseUsersDto, ResponseWrapperDto } from './interfaces/user';
import { UserService } from '../services/user.service';
import {
  heroAdjustmentsVerticalMini,
  heroCheckBadgeMini,
  heroEyeMini,
  heroPencilMini,
  heroTrashMini,
} from '@ng-icons/heroicons/mini';
import { ModalAddComponent } from '../components/modal-add/modal-add.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ModalAddComponent],
  templateUrl: './user.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  viewProviders: [
    provideIcons({
      heroEyeMini,
      heroPencilMini,
      heroCheckBadgeMini,
      heroAdjustmentsVerticalMini,
      heroTrashMini,
    }),
  ],
})
export class UserComponent implements OnInit {
  users: ResponseUsersDto | null = null;
  user: ResponseWrapperDto | null = null;

  headers: string[] = [
    'Nombres',
    'Apellidos',
    'Correo',
    'Celular',
    'Estado Habilitado',
    'Acciones',
  ];

  actions = [
    {
      name: 'Ver detalle',
      icon: 'heroEyeMini',
      color: 'bg-green-500',
      method: 'view',
    },
    {
      name: 'Actualizar cliente',
      icon: 'heroPencilMini',
      color: 'bg-yellow-500',
      method: 'update',
    },
    {
      name: 'Cambiar estado',
      icon: 'heroAdjustmentsVerticalMini',
      color: 'bg-purple-500',
      method: 'toggleState',
    },
    {
      name: 'Eliminar cliente',
      icon: 'heroTrashMini',
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
    if (action === 'create') {
      const modal = document.getElementById('modal-add');
      if (modal) {
        modal.style.display = 'flex';
      }
    } else {
      console.log(`Abriendo modal para ${action}${id ? ` con ID ${id}` : ''}`);
    }
  }
}
