import { createContext, useContext, useEffect, useState } from "react"
import { Pagination, getAllTeachers } from "../api/teacher";
import { ITeacher } from "../interfaces/teacher";


interface TeacherProviderProps {
  children: JSX.Element | JSX.Element[]
}
interface TeacherContextProp {

  onPageSizeChange: (current: any, size: number) => void
  onPageChange: (page: number) => void
  fetchTeacher: (query: Pagination) => void
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

  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)

  console.log(teachers)

  const fetchTeacher = (query: Pagination) => {
    setLoading(true)
    getAllTeachers(query)
      .then(({ data }) => {
        console.log(data)
        setTeachers(data.response)
        setPage(data.metadata.current_page)
        setLimit(data.metadata.limit)
        setTotal(data.metadata.count)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onPageChange = (page: number) => {
    setPage(page)
  }

  const onPageSizeChange = (current: any, size: number) => {
    setLimit(size)
  }

  useEffect(() => {
    fetchTeacher({
      limit,
      page
    })
  }, [page,limit])


  return (
    <Context.Provider
      value={{
        teachers,
        limit,
        loading,
        page,
        total,
        fetchTeacher,
        onPageChange,
        onPageSizeChange
      }}>
      {children}
    </Context.Provider>
  )
}
