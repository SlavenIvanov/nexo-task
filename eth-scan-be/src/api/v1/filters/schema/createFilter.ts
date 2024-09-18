import { z } from 'zod'
import { NumberStringComparators, NumberStringProperties } from '../../../../db/schema/filter'

export const CreateFilterRequest = z.object({
  property: z.enum(NumberStringProperties),
  comparator: z.enum(NumberStringComparators),
  value: z.string().regex(/^\d+$/, 'Must be a number string')
})

export const CreateFilterResponse = z.object({
  message: z.string()
})

export type CreateFilter = z.infer<typeof CreateFilterRequest>
