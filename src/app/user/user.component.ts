// src/app/components/user/user.component.ts

import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { ResponseUsersDto, ResponseWrapperDto } from "./interfaces/user";
import { UserService } from "../services/user.service";
import { UserDataService } from "../services/user-data.service";
import {
  heroAdjustmentsVerticalMini,
  heroCheckBadgeMini,
  heroEyeMini,
  heroPencilMini,
  heroTrashMini,
} from "@ng-icons/heroicons/mini";
import { ModalAddComponent } from "../components/modal-add/modal-add.component";
import { ToastrService } from "ngx-toastr";
import { NgxPaginationModule } from 'ngx-pagination';  // Importar NgxPaginationModule

@Component({
  selector: "app-user",
  standalone: true,
  imports: [CommonModule, NgIconComponent, ModalAddComponent, NgxPaginationModule], // Agregar NgxPaginationModule
  templateUrl: "./user.component.html",
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
  p: number = 1; // Página actual
  itemsPerPage: number = 5; // Items por página

  headers: string[] = [
    "Nombres",
    "Apellidos",
    "Correo",
    "Celular",
    "Estado Habilitado",
    "Acciones",
  ];

  actions = [
    {
      name: "Ver detalle",
      icon: "heroEyeMini",
      color: "bg-green-500",
      method: "view",
    },
    {
      name: "Actualizar cliente",
      icon: "heroPencilMini",
      color: "bg-yellow-500",
      method: "update",
    },
    {
      name: "Cambiar estado",
      icon: "heroAdjustmentsVerticalMini",
      color: "bg-purple-500",
      method: "toggleState",
    },
    {
      name: "Eliminar cliente",
      icon: "heroTrashMini",
      color: "bg-red-500",
      method: "delete",
    },
  ];

  constructor(
    private userService: UserService,
    private userDataService: UserDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
      this.userDataService.setUsers(response); // Guardar datos en el servicio compartido
      this.toastr.success("Usuarios cargados exitosamente");
    });
  }

  handleAction(action: string, id?: string): void {
    if (action === "create") {
      const modal = document.getElementById("modal-add");
      if (modal) {
        modal.style.display = "flex";
      }
    } else {
      console.log(`Abriendo modal para ${action}${id ? ` con ID ${id}` : ""}`);
    }
  }

  // Calcula el total de páginas
  get totalPages(): number {
    return this.users ? Math.ceil(this.users.data.length / this.itemsPerPage) : 0;
  }

  // Verifica si es la primera página
  get isFirstPage(): boolean {
    return this.p === 1;
  }

  // Verifica si es la última página
  get isLastPage(): boolean {
    return this.p === this.totalPages;
  }

  // Cambia a la página anterior
  previousPage(): void {
    if (!this.isFirstPage) {
      this.p--;
    }
  }

  // Cambia a la siguiente página
  nextPage(): void {
    if (!this.isLastPage) {
      this.p++;
    }
  }
}
