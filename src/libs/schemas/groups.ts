import { z } from "zod";

export const groupSchema = z.object({
  group: z.string(),
  number: z.string(),
  nivel: z.string(),
  teacher: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  days: z.string(),
})

export type groupType = z.infer<typeof groupSchema>