import { createContext, useContext, useEffect, useState } from 'react'
import { IGroup } from '../interfaces/group'
import { Pagination, getAllGroups } from '../api/groups'
import { useSearchParams } from 'react-router-dom'
import { Becas } from '../interfaces/becas'

interface GroupContextProps {
  handleFilterChange: (q?: [string, string][]) => void
  groups: IGroup[]
  loading: boolean
  page: number
  limit: number
  total: number
  becas: Becas[]
}

interface GroupProviderProps {
  children: JSX.Element | JSX.Element[]
}

const Context = createContext<GroupContextProps | undefined>(undefined)

export const useGroupContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('Group context debe ser utilizado dentro de un provider.');
  }
  return context;
}

export const GroupProvider = ({ children }: GroupProviderProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(10)
  const [groups, setGroups] = useState([])
  const [becas, setBecas] = useState<Becas[]>([]);

  const handleFilterChange = (q?: [string, string][]) => {
    console.log(q)
    setSearchParams((params) => {
      q?.forEach(([term, value]) => {
        if (value === undefined || value === "") {
          return params.delete(term)
        }
        params.set(term, value)
      })
      return params
    })

    fetchData({
      page: Number(searchParams.get('page') || 1),
      limit: Number(searchParams.get('limit') || 10),
      level: searchParams.get('level') || '',
      group: searchParams.get('group') || '',
    });
  };

  const fetchData = (query: Pagination) => {
    setLoading(true)
    getAllGroups(query)
      .then(({ data }) => {
        setPage(data.metadata.current_page)
        setLimit(data.metadata.limit)
        setTotal(data.metadata.count)
        setGroups(data.response)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData({ page, limit, })
  }, [])


  const contextValue: GroupContextProps = {
    handleFilterChange,
    groups,
    loading,
    page,
    limit,
    total,
    becas
  }

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  )
}
