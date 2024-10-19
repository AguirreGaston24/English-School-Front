import { createContext, useContext, useEffect, useState } from "react";
import { Pagination, deleteTeacher, getAllTeachers } from "../api/teacher";
import { ITeacher } from "../interfaces/teacher";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { Modal } from "antd"; // Importar Modal de Ant Design

interface TeacherProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface TeacherContextProp {
  handleFilterChange: (term?: [string, string][]) => void;
  fetchTeacher: (query: Pagination) => void;
  handleDelete: (id: string) => void;
  teachers: ITeacher[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
}

const Context = createContext<TeacherContextProp | undefined>(undefined);

export const useTeacherContext = (): TeacherContextProp => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("El Teacher Context debe ser utilizado dentro de un provider");
  }
  return context;
};

export const TeacherProvider = ({ children }: TeacherProviderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  // Función para actualizar profesores
  const fetchTeacher = (query: Pagination) => {
    setLoading(true);
    getAllTeachers(query)
      .then(({ data }) => {
        setTeachers(data.response);
        setPage(data.metadata.current_page);
        setLimit(data.metadata.limit);
        setTotal(data.metadata.results);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFilterChange = (q?: [string, string][]) => {
    setSearchParams((params) => {
      q?.forEach(([term, value]) => {
        if (value === undefined || value === "") {
          return params.delete(term);
        }
        params.set(term, value);
      });
      return params;
    });

    // Llamar a fetchTeacher después de actualizar searchParams
    fetchTeacher({
      page: Number(searchParams.get('page') || 1),
      limit: Number(searchParams.get('limit') || 10),
      term: searchParams.get('term') || '',
    });
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas eliminar este profesor?',
      content: 'Una vez eliminado, no podrás recuperar esta información.',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        setLoading(true);
        try {
          await deleteTeacher(id);
          toast.success('Profesor eliminado exitosamente');
  
          // Llama a fetchTeacher para recargar la lista de profesores después de eliminar
          fetchTeacher({
            page,
            limit,
          });
        } catch (error) {
          console.error("Error deleting teacher:", error);
          toast.error('Error al eliminar el profesor.');
        } finally {
          setLoading(false);
        }
      },
    });
  };
  
  

  useEffect(() => {
    fetchTeacher({ limit, page });
  }, [page, limit]);

  return (
    <Context.Provider
      value={{
        teachers,
        limit,
        loading,
        page,
        total,
        fetchTeacher,
        handleDelete,
        handleFilterChange,
      }}
    >
      {children}
    </Context.Provider>
  );
};
