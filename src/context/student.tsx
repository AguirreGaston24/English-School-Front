import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { Pagination } from "../interfaces/pagination";
import { getAllStudents } from "../api/students";
import { IStudent } from "../interfaces/student";

interface StudentProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface StudentContextProps {
  students: IStudent[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
  fetchData: (query: Pagination) => void;
  handleFilterChange: (term?: [string, string][]) => void;
}

const Context = createContext<StudentContextProps | undefined>(undefined);

export const useStudent = (): StudentContextProps => {
  const context = useContext(Context);
  if (!context) throw new Error('El student context debe ser utilizado dentro de un provider.');
  return context;
}

export const StudentProvider = ({ children }: StudentProviderProps) => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchData({
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 10,
      term: searchParams.get('term') || '',
      school: searchParams.get('school') || '',
      teacher: searchParams.get('teacher') || '',
      district: searchParams.get('district') || '',
      group: searchParams.get('group') || '',
    });
  }, [searchParams]);

  const handleFilterChange = (q?: [string, string][]) => {
    const newParams = new URLSearchParams(searchParams.toString());
    q?.forEach(([term, value]) => {
      if (value === undefined || value === "") {
        newParams.delete(term);
      } else {
        newParams.set(term, value);
      }
    });

    // Actualiza el estado de searchParams y llama a fetchData
    setSearchParams(newParams, { replace: true }); // Cambia el segundo parámetro a `true` si no quieres agregar un nuevo historial.
    
    fetchData({
      page: Number(newParams.get('page')) || 1,
      limit: Number(newParams.get('limit')) || 10,
      term: newParams.get('term') || '',
      school: newParams.get('school') || '',
      teacher: newParams.get('teacher') || '',
      district: newParams.get('district') || '',
      group: newParams.get('group') || '',
    });
  };

  const fetchData = async (query: Pagination) => {
    setLoading(true);
    console.log("Fetching data with query:", query); // Para depuración
    try {
        const { data } = await getAllStudents(query);
        console.log(data.metadata); // Para depuración
        setStudents(data.response);
        setLimit(data.metadata.limit);
        setTotal(data.metadata.count);
        setPage(data.metadata.current_page);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Manejo específico de errores de Axios
            console.error('Error fetching students:', error.response?.data || error.message);
            alert(`Error: ${error.response?.data?.message || 'Error al cargar los datos.'}`);
        } else {
            // Manejo de otros tipos de errores
            console.error('Error fetching students:', error);
            alert('Error desconocido. Por favor, intente nuevamente más tarde.');
        }
    } finally {
        setLoading(false);
    }
};

  const values: StudentContextProps = {
    students,
    limit,
    loading,
    page,
    total,
    fetchData,
    handleFilterChange,
  };

  return (
    <Context.Provider value={values}>
      {children}
    </Context.Provider>
  );
}
