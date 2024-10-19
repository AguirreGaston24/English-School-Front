import { Group } from "antd/es/radio";
import instance from ".";
import { ITeacher } from "../interfaces/teacher";

// Define la interfaz para la paginación
export interface Pagination {
  page?: number;
  limit?: number;
  level?: string;
  group?: string;
}

// Define la interfaz para el payload del grupo
export interface IGroup {
  _id: string; // Asegúrate de que esto esté presente
  name: string;
  start_date: string; // Considera usar Date si manejas fechas como objetos
  end_date: string;   // Considera usar Date si manejas fechas como objetos
  capacity: number;
  studentCount: number; // Cambia a `students` si es necesario
  level: string;
  group: string;
  days: string[];
  teacher?: string | ITeacher; // O ITeacher dependiendo de cómo esté definida
  students_count?: number;
}

// Obtener todos los grupos
export const getAllGroups = (query: Pagination) => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(key, value.toString());
    }
  });

  return instance.get('/groups?' + params.toString())
    .catch(error => {
      console.error('Error fetching groups:', error);
      throw error; // Re-lanzar el error para manejarlo más arriba si es necesario
    });
};

// Obtener un grupo específico por ID
export const getGroups = (id: string) => {
  return instance.get('/groups/' + id)
    .catch(error => {
      console.error(`Error fetching group with ID ${id}:`, error);
      throw error;
    });
};

// Crear un nuevo grupo
export const createGroup = (payload: IGroup) => {
  console.log('Payload para crear el grupo:', payload); // Agrega este log
  return instance.post('/groups', payload)
    .catch(error => {
      console.error('Error creating group:', error.response ? error.response.data : error);
      throw error;
    });
};
// Actualizar un grupo existente
export const updateGroup = (id: string, payload: IGroup) => {
  return instance.patch('/groups/' + id, payload)
    .catch(error => {
      console.error(`Error updating group with ID ${id}:`, error);
      throw error;
    });
};

// Eliminar un grupo
export const deleteGroup = (id: string) => {
  return instance.delete('/groups/' + id)
    .catch(error => {
      console.error(`Error deleting group with ID ${id}:`, error);
      throw error;
    });
};

export const addStudentsToGroup = (groupId: string, studentIds: string[]) => {
  return instance.post(`/groups/${groupId}/students`, { studentIds })
    .catch(error => {
      console.error(`Error adding students to group with ID ${groupId}:`, error);
      throw error;
    });
};
