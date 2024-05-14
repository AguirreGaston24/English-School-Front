export interface IStudent {
  _id: string
  firstname: string
  lastname: string
  birth_date: string | null
  country: string
  city: string
  email: string
  address: string
  district: string
  phone: string
  dni: string
  school: string
  group: string
  level?: string
  teacher: string
  tutor: string
  tutor_occupation: string
  tutor_phone: string
  tutor_address: string
  tutor_district: string
}