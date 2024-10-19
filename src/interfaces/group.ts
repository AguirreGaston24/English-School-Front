import { ITeacher } from "./teacher";

export interface IGroup {
  _id: string;              // ID único del grupo
  level: string;           // Nivel del grupo
  teacher: string;         // Nombre del profesor (puedes eliminar si ya tienes `teacher_id`)
  teacher_id: ITeacher;    // Objeto del profesor asociado
  group: string;           // Nombre del grupo
  start_date: Date;       // Fecha y hora de inicio
  end_date: Date;         // Fecha y hora de finalización
  days: string[];         // Días en los que se imparte el grupo
  createdAt: Date;        // Fecha de creación
  updatedAt: Date;        // Fecha de última actualización
  capacity: number;       // Capacidad máxima del grupo
  students: number;       // Número actual de estudiantes inscritos
  maxCapacity: number;    // Capacidad máxima permitida (si se usa un campo separado)
}
