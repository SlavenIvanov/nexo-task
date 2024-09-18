import { z } from 'zod'

export const UpdateFilterRequest = z.object({
  enabled: z.boolean()
})

export type UpdateFilter = z.infer<typeof UpdateFilterRequest>
