import instance from "."
import { IStudent } from "../interfaces/student"

export const getAllStudents = () => {
  return instance.get('/students')
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