import { z } from "zod";

export const groupSchema = z.object({
  group: z.string({message: 'El nivel es requerido.'}),
  number: z.string({message: 'El nivel es requerido.'}),
  level: z.string({message: 'El nivel es requerido.'}),
  teacher: z.string({message: 'El nivel es requerido.'}),
  start_date: z.string({message: 'El nivel es requerido.'}),
  end_date: z.string({message: 'El nivel es requerido.'}),
  days: z.string({message: 'El nivel es requerido.'}),
})

export type groupType = z.infer<typeof groupSchema>