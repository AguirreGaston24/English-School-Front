import instance from "."

export interface Pagination {
  page?: number,
  limit?: number,
  level?: string
}

export const getAllGroups = (query: Pagination) => {
  const params = new URLSearchParams(query as {})

  return instance.get('/groups?' + params.toString())
}

export const getGroups = (id: string) => {
  return instance.get('/groups/' + id)
}

export const createGroup = (payload: any) => {
  return instance.post('/groups', payload)
}

export const updateGroup = (id: string, payload: any) => {
  return instance.patch('/groups/' + id, payload)
}

export const deleteGroup = (id: string) => {
  return instance.delete('/groups/' + id)
}