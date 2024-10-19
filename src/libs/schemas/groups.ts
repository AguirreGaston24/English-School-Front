import { z } from "zod";

export const groupSchema = z.object({
  level: z.string().nonempty(),
  teacher: z.string().optional(), // Cambia aquí si el nombre es diferente
  group: z.string().nonempty(),
  start_date: z.string().nonempty(),
  end_date: z.string().nonempty(),
  days: z.string().array(),
  capacity: z.number().min(1, "Capacity must be at least 1"),

});

export type groupType = z.infer<typeof groupSchema>