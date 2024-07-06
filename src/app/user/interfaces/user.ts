// src/app/user/dto.ts

export interface BaseResponseUserDto {
  statusCode: number;
  message: string;
}

export interface CreateUserDto {
  nombres: string;
  apellidos: string;
  edad?: number;
  direccion?: string;
  correo: string;
  celular: string;
  fecha_nacimiento?: string;
  estado_habilitado: boolean;
}

export interface ResponseUserDto {
  cliente_id: number;
  nombres: string;
  apellidos: string;
  edad: number | null;
  direccion: string | null;
  correo: string;
  celular: string;
  fecha_nacimiento: string | null;
  estado_habilitado: boolean;
  fecha_creacion: string;
  fecha_modificacion: string;
}

export interface ResponseWrapperDto extends BaseResponseUserDto {
  data: ResponseUserDto;
}

export interface ResponseUsersDto extends BaseResponseUserDto {
  data: ResponseUserDto[];
}

export interface UpdateUserDto {
  nombres?: string;
  apellidos?: string;
  edad?: number;
  direccion?: string;
  correo?: string;
  celular?: string;
  fecha_nacimiento?: string;
  estado_habilitado?: boolean;
}
