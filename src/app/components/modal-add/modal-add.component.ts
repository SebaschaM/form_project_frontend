import { CommonModule } from '@angular/common';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CreateUserDto } from '../../user/interfaces/user';
import { ToastService } from '../toast/toas-service';
import { ToastsContainer } from '../toast/toasts-container.component';

@Component({
  selector: 'app-modal-add',
  standalone: true,
  templateUrl: './modal-add.component.html',
  imports: [FormsModule, CommonModule, ToastsContainer],
})
export class ModalAddComponent {
  @ViewChild('clientForm') clientForm!: NgForm;

  client = {
    nombres: '',
    apellidos: '',
    correo: '',
    celular: '',
    fecha_nacimiento: '',
    estado_habilitado: false,
  };

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) {} // Añade ToastService al constructor

  createUser(createUserDto: CreateUserDto): void {
    this.userService.createUser(createUserDto).subscribe({
      next: (response) => {
        console.log('Usuario creado:', response);
        this.showSuccess(); // Muestra un toast de éxito
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
        this.showError(); // Muestra un toast de error
      },
    });
  }

  closeModal() {
    this.resetForm();
    const modal = document.getElementById('modal-add');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formattedDate = this.formatDate(this.client.fecha_nacimiento);
      this.client.fecha_nacimiento = formattedDate;
      console.log('Cliente agregado:', this.client);
      this.createUser(this.client);
      this.closeModal();
    } else {
      form.control.markAllAsTouched();
      console.log('Formulario inválido');
    }
  }

  calculateAge(dateString: string): number {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  resetForm() {
    this.client = {
      nombres: '',
      apellidos: '',
      correo: '',
      celular: '',
      fecha_nacimiento: '',
      estado_habilitado: false,
    };
    this.clientForm.resetForm();
  }

  handleDateInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const [year, month, day] = input.value.split('-');
    this.client.fecha_nacimiento = `${year}-${month}-${day}`;
  }

  formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  // Métodos para mostrar toasts
  showSuccess() {
    const template = this.successTpl;
    this.toastService.show({
      template,
      classname: 'bg-success text-light',
      delay: 5000,
    });
  }

  showError() {
    const template = this.errorTpl;
    this.toastService.show({
      template,
      classname: 'bg-danger text-light',
      delay: 5000,
    });
  }

  // Referencias de plantilla para los toasts
  successTpl!: TemplateRef<any>;
  errorTpl!: TemplateRef<any>;
}
