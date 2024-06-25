import { createContext, useContext, useEffect, useState } from "react"
import { Pagination, deleteTeacher, getAllTeachers } from "../api/teacher";
import { ITeacher } from "../interfaces/teacher";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

interface TeacherProviderProps {
  children: JSX.Element | JSX.Element[]
}
interface TeacherContextProp {
  handleFilterChange: (term?: [string, string][]) => void
  fetchTeacher: (query: Pagination) => void
  handleDelete: (id: string) => void
  teachers: ITeacher[],
  loading: boolean,
  page: number,
  limit: number,
  total: number,
}

const Context = createContext<TeacherContextProp | undefined>(undefined);

export const useTeacherContext = (): TeacherContextProp => {
  const context = useContext(Context)
  if (!context) {
    throw new Error("El Teacher Context debe ser utilizado dentro de un provider")
  }
  return context
}

export const TeacherProvider = ({ children }: TeacherProviderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)

  console.log(teachers)

  const handleFilterChange = (q?: [string, string][]) => {
    console.log(q)
    setSearchParams((params) => {
      q?.forEach(([term, value]) => {
        if (value == undefined || value === "") {
          return params.delete(term)
        }
        params.set(term, value)
      })
      return params
    })

    fetchTeacher({
      page: Number(searchParams.get('page') || 1),
      limit: Number(searchParams.get('limit') || 10),
    });
  };

  const fetchTeacher = (query: Pagination) => {
    setLoading(true)
    getAllTeachers(query)
      .then(({ data }) => {
        console.log(data)
        setTeachers(data.response)
        setPage(data.metadata.current_page)
        setLimit(data.metadata.limit)
        setTotal(data.metadata.results)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleDelete = (id: string) => {
    setLoading(true)
    deleteTeacher(id)
      .then(({ data }) => {
        toast.success('Profresor/a removido con exito!.')
        fetchTeacher({
          page,
          limit
        })
      })
      .catch((error) => {
        console.log(error)
        toast.success('Opps! Algo salio mal.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchTeacher({
      limit,
      page
    })
  }, [page, limit])


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
        handleFilterChange
      }}>
      {children}
    </Context.Provider>
  )
}
