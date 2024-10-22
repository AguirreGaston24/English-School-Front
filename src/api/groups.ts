import instance from ".";
import { ITeacher } from "../interfaces/teacher";

// Interfaz para paginación
export interface Pagination {
  page?: number;
  limit?: number;
  level?: string;
  group?: string;
}

// Interfaz para el payload del grupo
export interface IGroup {
  _id?: string; // Agregar esta línea para permitir el campo _id
  start_date: string; // Considera usar Date si manejas fechas como objetos
  end_date: string;   // Considera usar Date si manejas fechas como objetos
  capacity: number;
  level: string;
  group: string;
  days: string[];
  teacher: string | ITeacher; // O ITeacher dependiendo de cómo esté definida
  students_count?: number; // Asegúrate de que esto esté presente
  studentCount?: number; // Agrega esta línea si es necesario
}

// Función para manejar errores de forma centralizada
const handleApiError = (action: string, error: any) => {
  console.error(`Error ${action}:`, error.response ? error.response.data : error);
  throw error; // Relanzar el error para que pueda ser manejado en la capa superior
};

// Obtener todos los grupos
export const getAllGroups = async (query: Pagination) => {
  try {
    const params = new URLSearchParams(query as Record<string, string>);
    const response = await instance.get(`/groups?${params.toString()}`);
    return response.data;
  } catch (error) {
    handleApiError('fetching groups', error);
  }
};

// Obtener un grupo específico por ID
export const getGroupById = async (id: string) => {
  try {
    const response = await instance.get(`/groups/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(`fetching group with ID ${id}`, error);
  }
};

// Crear un nuevo grupo
export const createGroup = async (payload: IGroup) => {
  try {
    // Convertir capacity a número
    payload.capacity = Number(payload.capacity);

    // Eliminar el campo _id si existe
    delete payload._id;

    console.log('Payload para crear el grupo:', payload); // Log de depuración
    const response = await instance.post('/groups', payload);
    return response.data;
  } catch (error) {
    handleApiError('creating group', error);
  }
};

// Actualizar un grupo existente
export const updateGroup = async (id: string, payload: IGroup) => {
  try {
    const response = await instance.patch(`/groups/${id}`, payload);
    return response.data;
  } catch (error) {
    handleApiError(`updating group with ID ${id}`, error);
  }
};

// Eliminar un grupo
export const deleteGroup = async (id: string) => {
  try {
    const response = await instance.delete(`/groups/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(`deleting group with ID ${id}`, error);
  }
};
