import instance from "."

export const getAllassists = () => {
  return instance.get('/assists')
}

export const getassists = (id: string) => {
  return instance.get('/assists/' + id)
}

export const createassists = (payload: any) => {
  return instance.post('/assists', payload)
}

export const updateassists = (id: string, payload: any) => {
  return instance.patch('/assists/' + id, payload)
}

export const deleteassists = (id: string) => {
  return instance.delete('/assists/' + id)
}