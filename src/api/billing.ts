import instance from ".";

// Interfaz para la paginación
export interface Pagination {
  page?: number;
  limit?: number;
}

// Interfaz para un objeto de Billing
export interface Billing {
  id?: string;
  amount: number;
  description: string;
  // Agrega más propiedades según sea necesario
}

// Obtener todos los billing con paginación
export const getAllBilling = (query: Pagination) => {
  const params = new URLSearchParams(query as {});
  return instance.get('/billing?' + params.toString());
}

// Obtener un billing específico por ID
export const getBilling = (id: string) => {
  return instance.get('/billing/' + id);
}

// Crear un nuevo billing
export const createbilling = (payload: Billing) => {
  return instance.post('/billing', payload);
}

// Actualizar un billing existente
export const updateBilling = (id: string, payload: Billing) => {
  return instance.patch('/billing/' + id, payload);
}

// Eliminar un billing
export const deleteBilling = (id: string) => {
  return instance.delete('/billing/' + id);
}
