import { z } from 'zod'

export const UpdateFilterParams = z.object({
  id: z.string()
})

export const UpdateFilterRequest = z.object({
  enabled: z.boolean()
})

export const UpdateFilterResponse = z.object({
  message: z.string()
})

export type UpdateFilter = z.infer<typeof UpdateFilterRequest>
