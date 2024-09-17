import instance from "."
import { Pagination } from "./teacher";
import { IStudent } from "../interfaces/student"


export const getAllStudents = (params?: Pagination) => {
  const queryParams = new URLSearchParams(params as any);
  return instance.get(`/students?${queryParams.toString()}`)
}

export const getStudent = (id: string) => {
  return instance.get('/students/' + id)
}

export const createStudent = (payload: Omit<IStudent, '_id'>) => {
  return instance.post('/students', payload)
}

export const updateStudent = (id: string, payload: Omit<IStudent, '_id'>) => {
  return instance.patch('/students/' + id, payload)
}

export const deleteStudent = (id: string) => {
  return instance.delete('/students/' + id)
}