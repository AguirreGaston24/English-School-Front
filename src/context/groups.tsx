import { createContext, useContext, useState } from "react"
import { IGroups } from "../interfaces/groups"

import { getAllGroups } from "../api/groups"
import { Pagination } from "../api/teacher"

interface GroupsProviderProps {
  children: JSX.Element | JSX.Element[]
}

interface GroupsContextProp {
  fetchGroups: (query: Pagination) => void
  groups: IGroups[],
  loading: boolean,
  page: number,
  limit: number,
  total: number
}

const Context = createContext<GroupsContextProp | undefined>(undefined);

export const useGroupsContext = (): GroupsContextProp => {
  const context = useContext(Context)
  if (!context) {
    throw new Error("El Grupo Context debe ser utilizado dentro de un provider")
  }
  return context
}

export const GruopsProvider = ({ children }: GroupsProviderProps) => {

  const [groups, setGroups] = useState<IGroups[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)

  const fetchGroups = (query: Pagination) => {
    setLoading(true)
    getAllGroups({})
      .then(({ data }) => {
        console.log(data)
        setGroups(data.response)
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

  return (
    <Context.Provider
      value={{
        groups,
        page,
        loading,
        limit,
        total,
        fetchGroups
      }}
    >
      {children}
    </Context.Provider>
  )
}
