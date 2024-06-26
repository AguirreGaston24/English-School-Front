import { createContext, useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Pagination, getAllBilling } from '../api/billing'

interface BilingContextProps {
  handleFilterChange: (q?: [string, string][]) => void
  billings: any[]
  loading: boolean
  page: number
  limit: number
  total: number
}

interface BillingProviderProps {
  children: JSX.Element | JSX.Element[]
}

const Context = createContext<BilingContextProps | undefined>(undefined)

export const useBillingContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('Billing context debe ser utilizado dentro de un provider.');
  }
  return context;
}

export const BillingProvider = ({ children }: BillingProviderProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(10)
  const [billings, setBillings] = useState([])

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
    });
  };

  const fetchData = (query: Pagination) => {
    setLoading(true)
    getAllBilling(query)
      .then(({ data }) => {
        console.log(data)
        // setPage(data.metadata.current_page)
        // setLimit(data.metadata.limit)
        // setTotal(data.metadata.count)
        setBillings(data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData({ page, limit, })
  }, [])


  const contextValue: BilingContextProps = {
    handleFilterChange,
    billings,
    loading,
    page,
    limit,
    total
  }

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  )
}
