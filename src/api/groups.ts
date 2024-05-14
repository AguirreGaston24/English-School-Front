import instance from "."

export const getAllGroups = () => {
  return instance.get('/groups')
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