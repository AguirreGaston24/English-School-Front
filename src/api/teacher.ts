import instance from "."
import { ITeacher } from "../interfaces/teacher"

export interface Pagination {
  page?: number,
  limit?: number,
}

export const getAllTeachers = (query: Pagination) => {
  const params = new URLSearchParams(query as {})

  return instance.get('/teachers?' + params.toString())
}

export const getTeacher = (id: string) => {
  return instance.get('/teachers/' + id)
}

export const createTeacher = (payload: Omit<ITeacher, '_id'>) => {
  return instance.post('/teachers', payload)
}

export const updateTeacher = (id: string, payload: Omit<ITeacher, '_id'>) => {
  return instance.patch('/teachers/' + id, payload)
}

export const deleteTeacher = (id: string) => {
  return instance.delete('/teachers/' + id)
}