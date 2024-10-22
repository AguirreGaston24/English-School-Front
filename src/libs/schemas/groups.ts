import { z } from 'zod';

export const groupSchema = z.object({
  start_date: z.string(), // o z.date() si manejas como Date
  end_date: z.string(),   // o z.date() si manejas como Date
  capacity: z.number(),
  level: z.string(),
  group: z.string(),
  days: z.array(z.string()),
  teacher: z.string(), // Asegúrate de que sea requerido
});