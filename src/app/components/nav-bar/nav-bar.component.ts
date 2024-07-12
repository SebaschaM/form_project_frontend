// src/app/components/nav-bar/nav-bar.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExcelService } from '../../services/excel.service'; // Asegúrate de tener la ruta correcta
import { UserDataService } from '../../services/user-data.service'; // Asegúrate de tener la ruta correcta

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  menuOpen = false;

  constructor(
    private excelService: ExcelService,
    private userDataService: UserDataService
  ) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  downloadClientes() {
    const users = this.userDataService.getUsers();
    if (users && users.data) {
      const data = users.data.map(user => ({
        nombres: user.nombres,
        apellidos: user.apellidos,
        correo: user.correo,
        celular: user.celular,
        estado_habilitado: user.estado_habilitado ? "Sí" : "No",
      }));
      this.excelService.exportAsExcelFile(data, 'clientes');
    } else {
      console.error('No hay datos de usuarios para exportar');
    }
  }
}
