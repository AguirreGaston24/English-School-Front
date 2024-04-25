import { z } from "zod";

export const TeacherSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.string(),
  start_date: z.string(),
  DNI: z.string(),
  email: z.string().email(),
  city: z.string(),
  address: z.string(),
  district: z.string(),
  phone: z.string(),
  dni: z.string(),
})

export type TeacherType = z.infer<typeof TeacherSchema>