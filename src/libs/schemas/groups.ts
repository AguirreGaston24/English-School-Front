import { z } from "zod";

export const groupSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  end_date: z.string(),
  start_date: z.string(),
  DNI: z.string(),
  email: z.string().email(),
  city: z.string(),
  address: z.string(),
  district: z.string(),
  phone: z.string(),
  dni: z.string(),
})

export type groupType = z.infer<typeof groupSchema>