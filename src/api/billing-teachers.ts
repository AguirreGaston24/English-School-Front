import instance from "."

export interface Pagination {
  page?: number,
  limit?: number,
}

export const getAllBillingTeachers = (query: Pagination) => {
  const params = new URLSearchParams(query as {})

  return instance.get('/billing?' + params.toString())
}

export const getBillingTeachers = (id: string) => {
  return instance.get('/billing/' + id)
}

export const createbillingTeachers = (payload: any) => {
  return instance.post('/billing', payload)
}

export const updatebillingTeachers = (id: string, payload: any) => {
  return instance.patch('/billing/' + id, payload)
}

export const deletebillingTeachers = (id: string) => {
  return instance.delete('/billing/' + id)
}