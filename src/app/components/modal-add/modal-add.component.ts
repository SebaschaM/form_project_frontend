import { CommonModule } from "@angular/common";
import { Component, ViewChild, TemplateRef } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { CreateUserDto, ResponseUsersDto } from "../../user/interfaces/user";
import { ToastrService } from "ngx-toastr";
import { formatDate } from "../../utils/formatDate";

@Component({
  selector: "app-modal-add",
  standalone: true,
  templateUrl: "./modal-add.component.html",
  imports: [FormsModule, CommonModule],
})
export class ModalAddComponent {
  @ViewChild("clientForm") clientForm!: NgForm;
  users: ResponseUsersDto | null = null;

  client = {
    nombres: "",
    apellidos: "",
    correo: "",
    celular: "",
    fecha_nacimiento: "",
    estado_habilitado: false,
  };

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  createUser(createUserDto: CreateUserDto): void {
    this.userService.createUser(createUserDto).subscribe({
      next: (response) => {
        console.log("Usuario creado:", response);
        this.toastr.success("Usuario creado exitosamente");
      },
      error: (error) => {
        console.error("Error al crear usuario:", error);
        this.toastr.error(error.error.message);
      },
    });
  }

  closeModal() {
    this.resetForm();
    const modal = document.getElementById("modal-add");
    if (modal) {
      modal.style.display = "none";
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formattedDate = formatDate(this.client.fecha_nacimiento);
      this.client.fecha_nacimiento = formattedDate;
      console.log("Cliente agregado:", this.client);
      this.createUser(this.client);
      this.closeModal();
    } else {
      form.control.markAllAsTouched();
      this.toastr.error("Por favor, complete todos los campos");
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
      nombres: "",
      apellidos: "",
      correo: "",
      celular: "",
      fecha_nacimiento: "",
      estado_habilitado: false,
    };
    this.clientForm.resetForm();
  }

  // Referencias de plantilla para los toasts
  successTpl!: TemplateRef<any>;
  errorTpl!: TemplateRef<any>;
}
