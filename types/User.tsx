// types/User.ts
export type UserRole = "estudiante" | "profesor" | "administrador";

export interface User {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  role: UserRole;
  carrera?: string; // Para estudiantes
  departamento?: string; // Para profesores
}

export interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  ubicacion: string;
  categoria: string;
  creadorId: string;
  maxAsistentes?: number;
  asistentes: string[];
  estado: "activo" | "cancelado" | "completado";
}
