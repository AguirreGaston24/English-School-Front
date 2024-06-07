import { createContext, useContext, useEffect, useState } from "react"

import { IStudent } from "../interfaces/student"
import { Pagination, getAllStudents } from "../api/students"

interface StudentProviderProps {
  children: JSX.Element | JSX.Element[]
}

interface StundentContextProps {
  students: IStudent[]
  loading: boolean
  page: number
  limit: number
  total: number
  fetchData: (query: Pagination) => void
  onPageChange: (page: number) => void,
  onPageSizeChange: (current: any, size: number) => void
  handleFilterChange: (filterName: string, value: string) => void
}

const Context = createContext<StundentContextProps | undefined>(undefined)

export const useStudent = (): StundentContextProps => {
  const context = useContext(Context)
  if (!context) throw new Error('El student context debe ser utilizado dentro de un provider.')
  return context
}

export const StudentProvider = ({ children }: StudentProviderProps) => {
  const [students, setStudents] = useState<IStudent[]>([])
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onPageSizeChange = (current: any, size: any) => {
    setLimit(size);
  };


  const handleFilterChange = (filterName: string, value: string) => {
    const queryParams = new URLSearchParams('');

    // Conserva la paginación existente
    const page = queryParams.get('page') || '1';
    const limit = queryParams.get('limit') || '10';
    if (page) queryParams.set('page', page);
    if (limit) queryParams.set('limit', limit);

    // Establece el nuevo filtro
    queryParams.set(filterName, value);

    // Construye la URL con la nueva consulta
    const queryString = queryParams.toString();

    // Actualiza la URL y recupera los estudiantes con la paginación existente
    fetchData({
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
      term: queryParams.get('term') || '',
      district: queryParams.get('district') || '',
      group: queryParams.get('group') || '',
      // Agrega más propiedades de filtro aquí según sea necesario
    });
  };


  const fetchData = (query: Pagination) => {
    setLoading(true)
    getAllStudents(query)
      .then(({ data }) => {
        console.log(data.metadata)
        setStudents(data.response)
        setLimit(data.metadata.limit)
        setTotal(data.metadata.count)
        setPage(data.metadata.current_page)
      })
      .catch((error) => console.log('todo mal'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData({ limit, page, })
  }, [limit, page])

  const values: StundentContextProps = {
    students,
    limit,
    loading,
    page,
    total,
    fetchData,
    onPageChange,
    onPageSizeChange,
    handleFilterChange,
  }

  return (
    <Context.Provider value={values}>
      {children}
    </Context.Provider>
  )
}
