export interface Pagination {
  term?: string;
  page?: number;
  limit?: number;
  teacher?: string
  school?: string
  order?: 'desc' | 'asc';
  sortBy?: string;
  district?: string;
  group?: string;
}