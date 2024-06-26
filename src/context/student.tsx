import { createContext, useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { Pagination } from "../interfaces/pagination"
import { getAllStudents } from "../api/students"
import { IStudent } from "../interfaces/student"

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
  handleFilterChange: (term?: [string, string][]) => void
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
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchData({})
  }, [])

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

    fetchData({
      page: Number(searchParams.get('page') || 1),
      limit: Number(searchParams.get('limit') || 10),
      term: searchParams.get('term') || '',
      school: searchParams.get('school') || '',
      teacher: searchParams.get('teacher') || '',
      district: searchParams.get('district') || '',
      group: searchParams.get('group') || '',
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

  const values: StundentContextProps = {
    students,
    limit,
    loading,
    page,
    total,
    fetchData,
    handleFilterChange,
  }

  return (
    <Context.Provider value={values}>
      {children}
    </Context.Provider>
  )
}
