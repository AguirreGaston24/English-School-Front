import { z } from "zod";

export const StudentSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  birth_date: z.string(),
  country: z.string(),
  email: z.string().email(),
  city: z.string(),
  address: z.string(),
  district: z.string(),
  phone: z.string(),
  dni: z.string(),
  school: z.string(),
  group: z.string(),
  teacher: z.string(),
  tutor: z.string(),
  tutor_occupation: z.string(),
  tutor_phone: z.string(),
  tutor_address: z.string(),
  tutor_district: z.string(),
})

export type StudentType = z.infer<typeof StudentSchema>