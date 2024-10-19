export interface Pagination {
  term?: string;
  page?: number;
  limit?: number;
  teacher?: string
  school?: string
  order?: 'desc' | 'asc';
  sortBy?: string;
  group?: string;
  email?: string;       // Agregado
  district?: string;    // Agregado
  firstname?: string;   // Agregado
  lastname?: string;
}