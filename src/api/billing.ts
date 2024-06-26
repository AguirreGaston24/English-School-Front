import instance from "."

export interface Pagination {
  page?: number,
  limit?: number,
}

export const getAllBilling = (query: Pagination) => {
  const params = new URLSearchParams(query as {})

  return instance.get('/billing?' + params.toString())
}

export const getBilling = (id: string) => {
  return instance.get('/billing/' + id)
}

export const createbilling = (payload: any) => {
  return instance.post('/billing', payload)
}

export const updatebilling = (id: string, payload: any) => {
  return instance.patch('/billing/' + id, payload)
}

export const deletebilling = (id: string) => {
  return instance.delete('/billing/' + id)
}