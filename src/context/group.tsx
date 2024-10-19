import { createContext, useContext, useEffect, useState } from 'react';
import { IGroup } from '../interfaces/group';
import { Pagination, getAllGroups } from '../api/groups';
import { useSearchParams } from 'react-router-dom';
import { Becas } from '../interfaces/becas';
import axios from 'axios';
import { toast } from 'sonner';

interface GroupContextProps {
  handleFilterChange: (q?: [string, string][]) => void;
  groups: IGroup[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
  becas: Becas[];
  setGroups: React.Dispatch<React.SetStateAction<IGroup[]>>;
  handleDelete: (id: string) => Promise<void>;  // Agregar el tipo para handleDelete
  handleEdit: (id: string, updatedGroup: IGroup) => Promise<void>;  // Agregar el tipo para handleEdit
}

interface GroupProviderProps {
  children: JSX.Element | JSX.Element[];
}

const Context = createContext<GroupContextProps | undefined>(undefined);

export const useGroupContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('Group context debe ser utilizado dentro de un provider.');
  }
  return context;
};

export const GroupProvider = ({ children }: GroupProviderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [becas, setBecas] = useState<Becas[]>([]);

  const handleFilterChange = (q?: [string, string][]) => {
    setSearchParams((params) => {
      // Eliminar parámetros existentes que estén vacíos
      q?.forEach(([term, value]) => {
        if (value) {
          params.set(term, value);
        } else {
          params.delete(term);
        }
      });
      return params;
    });
  };

  const fetchData = async (query: Pagination) => {
    setLoading(true);
    try {
      const { data } = await getAllGroups(query);
      const { metadata, response } = data;
  
      if (metadata && response) {
        setPage(metadata.current_page);
        setLimit(metadata.limit);
        setTotal(metadata.count);
        setGroups(response); // Asegúrate de que 'response' tiene los campos 'students' y 'maxCapacity'
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData({
      page: Number(searchParams.get('page') || 1),
      limit: Number(searchParams.get('limit') || 10),
      level: searchParams.get('level') || '',
      group: searchParams.get('group') || '',
    });
  }, [searchParams]);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este grupo?')) {
      setLoading(true); // Mostrar loading al eliminar
      try {
        await axios.delete(`/api/groups/${id}`);
        // Actualiza el estado de grupos sin necesidad de recargar
        setGroups(prevGroups => prevGroups.filter(group => group._id !== id));
        toast.success('Grupo eliminado exitosamente');
      } catch (error) {
        console.error('Error al eliminar el grupo:', error);
        toast.error('Error al eliminar el grupo. Intenta nuevamente.');
      } finally {
        setLoading(false); // Ocultar loading
      }
    }
  };

  const handleEdit = async (id: string, updatedGroup: IGroup) => {
    setLoading(true); // Mostrar loading al editar
    try {
      const response = await axios.put(`/api/groups/${id}`, updatedGroup);
      // Actualiza el estado de grupos
      setGroups(prevGroups => 
        prevGroups.map(group => (group._id === id ? response.data : group))
      );
      toast.success('Grupo editado exitosamente');
    } catch (error) {
      console.error('Error al editar el grupo:', error);
      toast.error('Error al editar el grupo. Intenta nuevamente.');
    } finally {
      setLoading(false); // Ocultar loading
    }
  };
  

  const contextValue: GroupContextProps = {
    handleFilterChange,
    groups,
    loading,
    page,
    limit,
    total,
    becas,
    setGroups,
    handleDelete,  // Agrega la función de eliminar
    handleEdit,    // Agrega la función de editar
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};
