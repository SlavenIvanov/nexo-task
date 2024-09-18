import { z } from 'zod'

export const DeleteFilterParams = z.object({
  id: z.string()
})

export const DeleteFilterResponse = z.object({
  message: z.string()
})
